import { View, StyleSheet, Image } from "react-native";

const HeaderLogo = () => {
  return (
    <View>
      <Image source={require("../assets/logoBnB.png")} style={styles.image} />
    </View>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
});
