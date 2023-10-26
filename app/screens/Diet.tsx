import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp } from "@react-navigation/native";
import Navigation from '../components/Navigation/Navigation'
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>
  }

export default function Diet( {navigation} : RouterProps)  {
  return (
    <View style={styles.container}>
      <Text>Diet</Text>
      <Navigation navigation={navigation}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      height: "100%",
      padding: 40,
      backgroundColor:"black"
    }
  })