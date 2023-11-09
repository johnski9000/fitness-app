import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { NavigationProp } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux'
import {  } from '../../userSlice'

import Navigation from '../components/Navigation/Navigation'
interface RouterProps {
    navigation: NavigationProp<any, any>
  }
export default function Home( {navigation} : RouterProps) {


  return (
    <View style={styles.container}>


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