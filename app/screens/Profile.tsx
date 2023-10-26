import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import Navigation from "../components/Navigation/Navigation";
import {
  FIREBASE_AUTH,
  FIREBASE_APP,
  FIRESTORAGE_DB,
} from "../../FirebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {  getDownloadURL } from "firebase/storage";
import { clearUser } from "../../userSlice";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export default function Details({ navigation }: RouterProps) {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch()
  const storageRef = ref(FIRESTORAGE_DB, `images/${user?.user?.uid}`);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (result.canceled) {
        return;
      }
      // https://firebasestorage.googleapis.com/v0/b/fitness-native-app.appspot.com/o/images/fnSWEs9NPRX1XAl26a00kV7czQx2?alt=media

      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      setLoading(true);
      uploadBytes(storageRef, blob).then(downloadURL => {
        console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
        setImage(downloadURL);
        console.log(4)
        console.log(downloadURL)
      })
      .catch(error => {
        console.error("Error uploading image:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* <Text style={{color: "white"}}>Profile</Text> */}
      <TouchableOpacity onPress={() => {
        dispatch(clearUser())
        FIREBASE_AUTH.signOut()}} >
        <Text style={{color: "white"}}>Log Out</Text>
      </TouchableOpacity>
      <View style={styles.profileImageMainContainer}>
        <ImageBackground
          source={require("../../assets/profile.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.profileImageMainBackground} />
          <TouchableOpacity
            onPress={pickImage}
            style={styles.profileImageContainer}
          >
            <Image
              source={
                user?.user?.photoURL
                  ? { uri: image }
                  : require("../../assets/noImage.webp")
              }
              resizeMode="cover"
              style={styles.profileImage}
            />

            <Image
              source={require("../../assets/camera.png")}
              style={styles.camera}
            />
          </TouchableOpacity>
        </ImageBackground>
      
      </View>
      <Navigation navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 0,
    backgroundColor: "white",
  },
  profileImageMainContainer: {
    height: 200,
    position: "relative",
  },
  profileImageMainBackground: {
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  imageBackground: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageContainer: {
    zIndex: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },
  camera: {
    width: 35,
    height: 35,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
