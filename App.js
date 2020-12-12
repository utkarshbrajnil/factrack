import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  ShowLocation from "./Screens/ShowLocation";
import  GetLocationScreen from "./Screens/GetLocationScreen";
import LoginScreen from './Screens/LoginScreen'

export default function App() {
  return (
    <ShowLocation />
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
