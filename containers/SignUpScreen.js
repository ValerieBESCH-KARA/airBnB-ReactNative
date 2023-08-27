import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import { useState } from "react";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confimrPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handelSubmit = async () => {
    // console.log("handelSubmit");

    if (email && description && username && password && confimrPassword) {
      if (password === confimrPassword) {
        try {
          const response = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              // parametres body : clé: valeur dans state
              email: email,
              description: description,
              username: username,
              password: password,
              // pas besoin de confirmPassword car juste pour nous
            }
          );

          console.log("response.data signUpScreen>>>", response.data.token);
          setToken(response.data.token);
          alert("votre compte a bien été créé !");
        } catch (error) {
          console.log("catch signupScreen>>>", error.response.data.error);
          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("Les mots de passe doivent être identiques");
      }
    } else {
      setErrorMessage("Veuillez templir tous les champs");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
    >
      <Image source={require("../assets/logoBnB.png")} style={styles.logo} />
      <Text style={styles.title}>Sign up</Text>

      {/* tester la liaison double sens des input:
      <Text>
        {email} {description} {username} {password} {confimrPassword}{" "}
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
        <TextInput
          style={styles.textInput}
          placeholder="username"
          onChangeText={(text) => {
            setErrorMessage("");
            setUsername(text);
          }}
          value={username}
          placeholderTextColor="grey"
        />
        <TextInput
          style={[styles.textInput, styles.description]}
          placeholder="describe yourselfe in a few words..."
          onChangeText={(text) => {
            setErrorMessage("");
            setDescription(text);
          }}
          value={description}
          multiline
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
            secureTextEntry={!passwordVisible}
            value={password}
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
        <View style={styles.inputPassword}>
          <TextInput
            style={styles.input}
            placeholder="confirm password"
            onChangeText={(text) => {
              setErrorMessage("");
              setConfirmPassword(text);
            }}
            secureTextEntry={!passwordVisible}
            value={confimrPassword}
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
        <Text style={styles.btn}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.redirection}>Already have an account? Sign in</Text>
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
  description: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    height: 95,
    textAlignVertical: "top",
    padding: 3,
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
