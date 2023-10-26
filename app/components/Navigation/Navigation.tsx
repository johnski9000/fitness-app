import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

interface NavigationProps {
  navigation: any; // Declare navigation as any type
}

export default function Navigation({ navigation }: NavigationProps) {
  const route = useRoute();
  const { name } = route;
  console.log(name)
  const data = [
    {
      image: require("../../../assets/home.png"),
      text: "Home",
    },
    {
      image: require("../../../assets/workout.png"),
      text: "Workout",
    },
    {
      image: require("../../../assets/balanced-diet.png"),
      text: "Diet",
    },
    {
      image: require("../../../assets/user.png"),
      text: "Profile",
    },
  ];
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
        onPress={() => navigation.navigate(item.text)}
        style={name === item.text ? styles.navItemActive : styles.navItem}
        key={index}
        >
          <Image source={item.image} style={name === item.text ? styles.navImageActive : styles.navImage}/>
          {/* <Text 
          style={name === item.text ? styles.navItemTextActive : styles.navItemText}
          >{item.text}</Text> */}
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    height: 60,
    backgroundColor: "#505050",
  },
  navItem: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    gap: 5
  },
  navItemActive: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5

  },
  navItemText: {
    color: "white"
  },
  navItemTextActive: {
    color:"rgb(253, 208, 47)",
    zIndex: 100,
  },
  navImage: {
    width: 35,
    height: 35,
    tintColor: 'white',
  },
  navImageActive: {
    width: 35,
    height: 35,
    tintColor: "rgb(253, 208, 47)"
  }
});
