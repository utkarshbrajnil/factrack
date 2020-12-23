import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";

// import{ AuthContext } from '../components/context';

export default function DrawerContent(props) {
  const paperTheme = useTheme();

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        alert("Successfully logged out");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri:
                    "https://instagram.fccu5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/104704884_640416233238001_8205067454928794298_n.jpg?_nc_ht=instagram.fccu5-1.fna.fbcdn.net&_nc_ohc=ZadolnuXNy8AX-B7A2Y&tp=1&oh=83fa9255cf9ce9f602f397636d8536b0&oe=600D2B4D",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Aryan Thakre</Title>
                <Caption style={styles.caption}>18BCE1189</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Caption style={styles.caption}>
                  aryan.thakre2018@vitstudent.ac.in
                </Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={()=> props.navigation.navigate("Home")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={()=> props.navigation.navigate("Profile")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="lock" color={color} size={size} />
              )}
              label="Change Password"
              onPress={()=> props.navigation.navigate("ChangePassword")}
            
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="arrow-right" color={color} size={size} />
              )}
              label="Status"
              onPress={()=> props.navigation.navigate("Status")}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={
            ()=>logOut()
          }
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
