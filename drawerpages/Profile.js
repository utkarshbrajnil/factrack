import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import TitleBar from "./TitleBar";
import { Icon } from "react-native-elements";

function Profile({ navigation }) {
  const [name, setName] = useState(" ");
  const [facID, setFacID] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [image, setImage] = useState("");
  const [greeting, setGreeting] = useState(" ");

  useEffect(() => {
    var user = firebase.auth().currentUser;
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      setGreeting("Good Morning");
    } else if (curHr < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    if (user) {
      console.log(user.uid);
    } else {
      console.log("No user");
    }

    let details = firebase.database().ref("users").child(`${user.uid}`);
    details.on("value", (val) => {
      setName(val.child("name").val());
      setFacID(val.child("facID").val());
      setEmail(val.child("email").val());
    });
    // return () => {
    //   cleanup;
    // };
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.uri !== null) {
      setImage(result.uri);
      console.log(image);

      const resp = await fetch(image);
      const blob = await resp.blob();

      let userId = firebase.auth().currentUser.uid;
      var ref = firebase
        .storage()
        .ref(`${userId}`)
        .child("images/" + "test-image");
      ref.put(blob);
    } else {
      alert("Couldn't upload image");
    }
  };

  const retrieveImage = () => {
    let userId = firebase.auth().currentUser.uid;

    firebase
      .storage()
      .ref(`${userId}/images/test-image`)
      .getDownloadURL()
      .then((uri) => {
        console.log(uri);
      })
      .catch((e) => alert("Error getting download uri", e.message));
  };

  return (
    <View style={styles.container}>
      <TitleBar navigation={navigation} />
      <View style={styles.page}>
        <Text style={styles.text}>{greeting}</Text>
        {/*time*/}
        <DataTable styles={styles.card}>
          <DataTable.Row>
            <DataTable.Cell>Name</DataTable.Cell>
            <DataTable.Cell numeric>{name}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>FacID</DataTable.Cell>
            <DataTable.Cell numeric>{facID}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>EmailID</DataTable.Cell>
            <DataTable.Cell numeric>{email}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <Text style={{ alignSelf: "center", margin: 20 }}>
          Choose an image from gallery
        </Text>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.picker}>
            <Icon name="camera-alt" color="black" />
          </View>
        </TouchableOpacity>
        <Button title="Download Image" onPress={retrieveImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    padding: 100,
    margin: 10,
  },
  icon: {},
  text: {
    padding: 50,
    margin: 10,
    alignSelf: "center",
    fontSize: 25,
  },
  page: {
    padding: 10,
    flex: 15,
    backgroundColor: "white",
  },

  picker: {
    height: 70,
    width: 70,
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
