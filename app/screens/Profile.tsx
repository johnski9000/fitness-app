import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import Navigation from "../components/Navigation/Navigation";
import { FIREBASE_AUTH, FIRESTORAGE_DB } from "../../FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "firebase/auth";
import { setUser } from "../../userSlice";
import { LinearGradient } from "expo-linear-gradient";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export default function Details({ navigation }: RouterProps) {
  const user = useSelector((state) => state.user);
  const auth = FIREBASE_AUTH;
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch();
  const storageRef = ref(FIRESTORAGE_DB, `images/${user?.user?.uid}`);
  const imageUrl = user?.user?.photoURL || undefined;

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
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      setLoading(true);
      uploadBytes(storageRef, blob)
        .then(() => {
          console.log("uploaded a file!");
        })
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              updateProfile(auth.currentUser, {
                photoURL: url,
              })
                .then(() => {
                  dispatch(setUser(auth.currentUser));
                  console.log("updated user");
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.error("Error getting the download URL: ", error);
            });
        });
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <View style={styles.container}>
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
              source={{ uri: imageUrl }}
              resizeMode="cover"
              alt=""
              style={styles.profileImage}
            />
            <Image
              source={require("../../assets/camera.png")}
              style={styles.camera}
            />
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Janusz Wozniak</Text>
          </View>
          <LinearGradient
            colors={["transparent", "rgb(255,255,255)"]}
            style={styles.gradient}
          />
        </ImageBackground>
        <View style={styles.scrollContainer}>
          <View style={styles.bodyweightDetailsContainer}>
            <View style={styles.bodyweightDetailsChild}>
              <Text>6 foot</Text>
            </View>
            <View style={styles.bodyweightDetailsChild}>
              <Text>100kg</Text>
            </View>
            <View style={styles.bodyweightDetailsChild}>
              <Text>18% bf</Text>
            </View>
          </View>
          <View>
            <Text>Email Address</Text>
            
          </View>
        </View>
      </View>
      <Navigation navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    overflow: "scroll"
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    zIndex: 10,
  },
  nameContainer: {
    zIndex: 11,
    marginTop: 20,
  },
  name: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
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
    zIndex: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 120 / 2,
  },
  camera: {
    width: 35,
    height: 35,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  bodyweightDetailsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    paddingTop: 20,
  },
  bodyweightDetailsChild: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
