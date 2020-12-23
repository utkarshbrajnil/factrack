import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Location from "expo-location";
import DrawerNavigator from '../navigation/DrawerNavigator'
import firebase from "firebase";

// import firebaseConfig from '../firebaseConfig'

 export default function GetLocationScreen({ navigation }) {
  // const [location, setLocation] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");
  // const [status, setStatus] = useState("");

  // const logOut = (navigation) => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(function () {
  //       alert("Successfully logged out");
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // };

  // firebase.auth().onAuthStateChanged(async function (user) {
  //   if (user) {
     
  //   }
  // });

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       console.log(errorMsg);
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);

  //     var lat = location["coords"]["latitude"];
  //     var long = location["coords"]["longitude"];
  //     console.log(lat, long);

  //     await firebase
  //       .database()
  //       .ref(`users/${firebase.auth().currentUser.uid}/coords`)
  //       .set({
  //         latitude: lat,
  //         longitude: long,
  //       });
  //   })();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enable location sharing</Text>
      <Button
        title="Logout"
        color="#841584"
        onPress={() => logOut(navigation)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "sans-serif-condensed",
    marginRight: 15,
    fontSize: 20,
  },
});


