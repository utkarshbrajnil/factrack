import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import GetLocation from "./Screens/GetLocationScreen";
import StackNavigator from "./navigation/StackNavigator";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import LoginScreen from "./Screens/LoginScreen";
import OnBoarding from "./Screens/OnBoarding";
import SignupScreen from "./Screens/SignupScreen";
import DrawerNavigator from "./navigation/DrawerNavigator";

export default function App() {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  firebase.auth().onAuthStateChanged((user) => {
    setIsAuthReady(true);
    setIsAuthenticated(!!user);
  });

  if ( !isAuthReady ) {
    return (
      <>
      <ActivityIndicator size="large" color="red" />
      {console.log("loading...")}
      </>
    )
  } else {
    return (
      <>
      {isAuthenticated ? <DrawerNavigator /> : <StackNavigator />}      
      </>
      
    )
  }
}
