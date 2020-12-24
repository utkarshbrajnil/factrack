import React, { useState, useEffect} from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import TitleBar from "./TitleBar";
import { IntentLauncherAndroid } from "expo";
import * as Location from "expo-location";

function HomeScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState();

  useEffect(() => {
    Location.hasServicesEnabledAsync()
      .then(() => {
        setIsEnabled(true);
      })
      .catch((error) => console.log(error));
  },[isEnabled]);

  // enableLocationfromSetting = () => {
  //   if (Platform.OS == "ios") {
  //     Linking.openURL("app-settings:");
  //   } else {
  //     IntentLauncherAndroid.startActivityAsync(
  //       IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
  //     );
  //   }
    //this.setState({ openSetting: false });
  // };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TitleBar navigation={navigation} />
      {/* <Button onPress={() => navigation.goBack()} title="Go back home" /> */}
      <View style={styles.page}>
        <Text> HOMEPAGE</Text>
        <View style={styles.location}>
          <Text style={styles.locationText}> Location</Text>
          <TouchableOpacity
            onPress={() => {
              // enableLocationfromSetting();
            }}
          >
            {isEnabled ? (
              <Icon name="location-on" size={50} color="green" />
            ) : (
              <Icon name="location-off" size={50} color="red" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    flex: 15,
    backgroundColor: "white",
  },
  location: {
    flexDirection: "row",
    margin: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 20,
  },
  locationText: {
    fontSize: 30,
    padding: 20,
  },
});
export default HomeScreen;
