import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ShowLocation from "../Screens/ShowLocation";
import LoginScreen from "../Screens/LoginScreen";
import OptionsPage from "../Screens/OptionsPage";
import OnBoarding from "../Screens/OnBoarding";
import SignupScreen from "../Screens/SignupScreen";
import ForgotPassword from "../Screens/ForgotPassword";
import Splash from "../Screens/Splash";

const Stack = createStackNavigator();

function MyStack() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  } else if (isFirstLaunch == true) {
    routeName = "OnBoarding";
  } else {
    routeName = "Options";
  }

  return (
    <Stack.Navigator
      initialRouteName={routeName}
      headerMode="none"
      mode="modal"
    >
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Options" component={OptionsPage} />
      <Stack.Screen name="Show" component={ShowLocation} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};
