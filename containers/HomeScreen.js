import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import LottieView from "lottie-react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);
  const animation = useRef(null);

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
    <View style={styles.lottieView}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "50",
          height: "50",
          backgroundColor: "white",
        }}
        source={require("../assets/animation.json")}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={roomList}
        keyExtractor={(item) => item._id}
        renderItem={(item) => {
          // console.log("item HomeScreen>>>", item);
          // console.log(item.item.price);
          return (
            <View>
              <View style={styles.pictureRoomBloc}>
                <Image
                  source={{ uri: item.item.photos[0].url }}
                  style={styles.pictureRoom}
                />
                <Text style={styles.price}>{item.item.price} €</Text>
              </View>

              <View style={styles.infoBloc}>
                <View>
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.item.title}
                  </Text>
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
    backgroundColor: "white",
  },
  lottieView: {
    backgroundColor: "white",
    height: "100%",
  },
  pictureRoomBloc: {
    position: "relative",
  },
  pictureRoom: {
    height: 200,
    width: "100%",
    marginVertical: 10,
  },
  price: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "black",
    color: "white",
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: "absolute",
    bottom: 20,
    left: 0,
  },
  infoBloc: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    width: 270,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
