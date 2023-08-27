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
import { Feather } from "@expo/vector-icons";

export default function SignInScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handelSubmit = async () => {
    // console.log("submit");

    if (email && password) {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email: email,
            password: password,
          }
        );

        console.log("response signIn>>>", response.data);
        if (response.data.token) {
          setToken(response.data.token);
        }
      } catch (error) {
        console.log("catch SignInScreen>>>", error.response.data.error);
        setErrorMessage("Votre email ou votre mot de passe ne correspond pas");
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
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
            setErrorMessage("");
            setEmail(text);
          }}
          value={email}
          placeholderTextColor="grey"
        />

        <View style={styles.inputPassword}>
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={(text) => {
              setErrorMessage("");
              setPassword(text);
            }}
            value={password}
            secureTextEntry={!passwordVisible}
            placeholderTextColor="grey"
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
            <Feather
              name={passwordVisible ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

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
  errorMessage: {
    color: "#F9575C",
    marginBottom: 10,
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
  inputPassword: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    color: "black",
    paddingBottom: 10,
    marginTop: 25,
  },
  input: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
});
