import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import LottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
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

  const displayStars = (num) => {
    const tab = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= num) {
        tab.push(<FontAwesome name="star" size={20} color="#FFB000" key={i} />);
      } else {
        tab.push(<FontAwesome name="star" size={20} color="grey" key={i} />);
      }
    }
    return tab;
    // console.log(tab);
  };

  // displayStars(5);

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
          console.log(item.item);
          return (
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.pictureRoomBloc}>
                <Image
                  source={{ uri: item.item.photos[0].url }}
                  style={styles.pictureRoom}
                />
                <Text style={styles.price}>{item.item.price} €</Text>
              </View>

              <View style={styles.infoBloc}>
                <View style={styles.info}>
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.item.title}
                  </Text>

                  <View style={styles.starsBloc}>
                    {displayStars(item.item.ratingValue)}
                    <Text style={styles.reviews}>
                      {item.item.reviews} reviews
                    </Text>
                  </View>
                </View>
                <Image
                  source={{ uri: item.item.user.account.photo.url }}
                  style={styles.avatar}
                />
              </View>
            </TouchableOpacity>
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
  info: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    width: 270,
  },
  starsBloc: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
    marginBottom: 7,
  },
  reviews: {
    color: "grey",
    fontSize: 13,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
