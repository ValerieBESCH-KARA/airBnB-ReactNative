import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useState } from "react";
import Constants from "expo-constants";

export default function SignInScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async () => {
    // console.log("submit");

    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );

      console.log("response signIn>>>", response.data.token);
      setToken(response.data.token);
    } catch (error) {
      console.log("catch SignInScreen>>>", error.response);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
    >
      <Image source={require("../assets/logoBnB.png")} style={styles.logo} />
      <Text style={styles.title}>Sign in</Text>

      {/* <Text>
        {email} {password}
      </Text> */}

      <View style={[styles.width, styles.marginBottom]}>
        <TextInput
          style={styles.textInput}
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          placeholderTextColor="#DCDCDD"
        />

        <TextInput
          style={styles.textInput}
          placeholder="password"
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          placeholderTextColor="#DCDCDD"
        />
      </View>

      <TouchableOpacity onPress={handelSubmit}>
        <Text style={styles.btn}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.redirection}>No account ? Register</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    margin: 35,
  },
  scrollView: {
    alignItems: "center",
  },
  logo: {
    height: 130,
    width: 90,
    resizeMode: "contain",
  },
  title: {
    color: "#747474",
    fontSize: 25,
    marginTop: 10,
  },
  width: {
    width: "100%",
  },
  textInput: {
    color: "black",
    paddingBottom: 10,
    marginTop: 25,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
  },
  marginBottom: {
    marginBottom: 70,
  },
  btn: {
    fontSize: 20,
    borderColor: "#F9575C",
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 70,
  },
  redirection: {
    marginVertical: 20,
  },
});
