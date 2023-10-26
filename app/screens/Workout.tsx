import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp } from "@react-navigation/native";
import Navigation from '../components/Navigation/Navigation'
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>
  }

export default function Workout( {navigation} : RouterProps)  {
  const apiKey = "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"
    return (
    <View style={styles.container}>
      <Text>Workout</Text>
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