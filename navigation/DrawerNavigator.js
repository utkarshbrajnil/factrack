import * as React from "react";
import { Button, View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../drawerpages/HomeScreen";
import Profile from "../drawerpages/Profile";
import DrawerContent from "./DrawerContent";
import ChangePassword from "../drawerpages/ChangePassword";
import Status from "../drawerpages/Status";


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent{...props}/>}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
        <Drawer.Screen name="Status" component={Status} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
