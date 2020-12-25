import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import TitleBar from "./TitleBar";
import { IntentLauncherAndroid } from "expo";
import * as Location from "expo-location";
import firebase from "firebase";

function HomeScreen({ navigation }) {
  const [location, setLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState(false);
  const [lat, setLatitude] = useState(22);
  const [long, setLongitude] = useState(88);

  const enableLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setStatus(false);
      setErrorMsg("Permission to access location was denied");
      console.log(errorMsg);
      return;
    }
    setStatus(true);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setStatus(false);
        setErrorMsg("Permission to access location was denied");
        console.log(errorMsg);
        return;
      }
      setStatus(true);

      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10,
        }
      );
      console.log(lat, long);

      await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/coords`)
        .set({
          latitude: lat,
          longitude: long,
        });
    })();
  }, [lat,long]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TitleBar navigation={navigation} />

      <View style={styles.page}>
        <Text> HOMEPAGE</Text>
        <View style={styles.location}>
          <Text style={styles.locationText}> Location</Text>
          <TouchableOpacity
            onPress={() => {
              status
                ? alert("disable location from settings")
                : enableLocation();
            }}
          >
            {status ? (
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
