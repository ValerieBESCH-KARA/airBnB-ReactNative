import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
      );

      // console.log("data HomeScreen>>>", response.data);

      setRoomList(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={roomList}
        keyExtractor={(item) => item._id}
        renderItem={(item) => {
          // console.log("item HomeScreen>>>", item);
          console.log(item.item.user.account.photo.url);
          return (
            <View>
              <Image
                source={{ uri: item.item.photos[0].url }}
                style={styles.pictureRoom}
              />

              <View>
                <View>
                  <Text>{item.item.title}</Text>
                </View>
                <Image
                  source={{ uri: item.item.user.account.photo.url }}
                  style={styles.avatar}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  pictureRoom: {
    height: 200,
    width: "100%",
    marginVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
