import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  ShowLocation from "./Screens/ShowLocation";
import  GetLocationScreen from "./Screens/GetLocationScreen";
import LoginScreen from './Screens/LoginScreen'
import About from './Screens/About';
import GetStarted from './Screens/GetStarted';
import OptionsPage from './Screens/OptionsPage';
import OnBoarding from './Screens/OnBoarding'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from './Screens/SignupScreen'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode="none" mode="modal">

      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Options" component={OptionsPage} />
      <Stack.Screen name="Show" component={ShowLocation} />
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="GetLocation" component={GetLocationScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>

     
    
  );
}
