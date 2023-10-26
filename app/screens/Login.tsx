import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const auth = FIREBASE_AUTH;


  async function signUp() {
    try {
      setLoading(true);
      const response = createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function signIn() {
    console.log(email)
    try {
      setLoading(true);
      const response = signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  console.log(auth.currentUser);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/login.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.overlay} />
      </ImageBackground>
      <View style={styles.innerContainer}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.titleImageContainer}>
            <Image
              style={styles.titleImage}
              source={require("../../assets/dumbbell.png")}
            />
          </View>
          <Text style={styles.title}>Fitness diet</Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <View style={styles.inputImageWrapper}>
              <Image
                source={require("../../assets/email.png")}
                style={styles.inputImage}
              />
            </View>
            <TextInput placeholder="Email" style={styles.input} placeholderTextColor="black" onChangeText={text => setEmail(text)}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputImageWrapper}>
              <Image
                source={require("../../assets/padlock.png")}
                style={styles.inputImage}
              />
            </View>
            <TextInput placeholder="Password" style={styles.input} placeholderTextColor="black" secureTextEntry={true} onChangeText={text => setPassword(text)}></TextInput>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={signIn} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={signUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#241d2f",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleImage: {
    width: 50,
    height: 50,
    tintColor: "white",
  },
  title: {
    color: "yellow",
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
  inputWrapper: {
    width: "90%",
    display: "flex",
    gap: 10,
    marginTop: 50,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 5,
  },
  inputImageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    borderRightColor: "rgba(255, 255, 255, 0.6)",
    borderTopColor: 0,
    borderBottomColor: 0,
    borderLeftColor: 0,
    borderStyle: "solid",
    borderWidth: 1,
  },
  inputImage: {
    width: 20,
    height: 20,
    tintColor: "black",
  },
  input: {
    height: "100%",
    padding: 10,
    width: "100%",
    display: "flex",
    color: "black",
  },
  buttonContainer: {
    display: "flex",
    gap: 10,
    marginTop: 20,
    width: "90%",
  },
  button: {
    backgroundColor: "#fdd02f",
    width: "100%",
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default Login;
