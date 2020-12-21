import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { Icon } from "react-native-elements";
import firebaseConfig from "../firebaseConfig";
import { BlurView } from 'expo-blur';
// import styles from "./App.module.css"
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,
} from "native-base";
import firebase from "firebase";


// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const image = {
  uri:
    "https://i.pinimg.com/originals/b9/16/73/b91673c3e31d8b688d4b5e28769eba67.png",
};

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [facID, setFacID] = useState();

  const createProfile = (name, facID, email, password, navigation) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          alert("Account created successfully");
          firebase
            .database()
            .ref(`users/${firebase.auth().currentUser.uid}`)
            .set({
              name: name,
              facID: facID,
              email: email,
              password: password,
            });
            firebase.auth().signOut();
          navigation.navigate("Login");
        },
        (error) => {
          alert(error.message);
        }
      );
  };

  return (
    <>
      <Container style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.title}>SignUp at TrackIT.</Text>
          <BlurView tint='default' style={[ styles.nonBlurredContent, styles.glass1]}>
            <Form style={styles.form}>
              <Item
                rounded
                style={{ backgroundColor: "rgba(184, 196, 212,0.4)" }}
              >
                <Icon name="email" style={{ marginLeft: 10 }} color="white" />
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  placeholder="Enter email"
                  style={{ color: "white" }}
                  onChangeText={(email) => setEmail(email)}
                />
              </Item>

              <Item
                rounded
                style={{
                  marginTop: 10,
                  backgroundColor: "rgba(184, 196, 212,0.4)",
                }}
              >
                <Icon name="lock" style={{ marginLeft: 10 }} color="white" />
                <Input
                  secureTextEntry
                  placeholderTextColor="white"
                  placeholder="Choose a password"
                  style={{ color: "white" }}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(pass) => setPassword(pass)}
                />
              </Item>

              <Item
                rounded
                style={{
                  backgroundColor: "rgba(184, 196, 212,0.4)",
                  marginTop: 10,
                }}
              >
                <Icon name="person" style={{ marginLeft: 10 }} color="white" />
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  placeholder="Enter name"
                  style={{ color: "white" }}
                  onChangeText={(name) => setName(name)}
                />
              </Item>

              <Item
                rounded
                style={{
                  backgroundColor: "rgba(184, 196, 212,0.4)",
                  marginTop: 10,
                }}
              >
                <Icon
                  name="fingerprint"
                  style={{ marginLeft: 10 }}
                  color="white"
                />
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  placeholder="Enter unique faculty ID"
                  style={{ color: "white" }}
                  onChangeText={(id) => setFacID(id)}
                />
              </Item>

              <Button
                full
                success
                style={{
                  marginTop: 40,
                  borderRadius: 20,
                  backgroundColor: "#0F2C52",
                }}
                onPress={() => {
                  createProfile(name, facID, email, password, navigation);
                  // alert("Profile has been created!");
                  //  navigation.navigate("Login");
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#cccccc",
                  }}
                >
                  Create profile
                </Text>
              </Button>
            </Form>
          </BlurView>
        </ImageBackground>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },

  glass1: {
    // backgroundColor: "rgba(184, 196, 212,0.4)",
    margin: 10,
    borderRadius: 20,

  },

  form: {
    marginVertical: 20,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },

  title: {
    fontWeight: "bold",
    fontSize: 60,
    alignSelf: "center",
    marginTop: 15,
    color: "#FFB81D",
    fontFamily: "sans-serif-condensed",
    marginLeft: 10,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  image1: {
    flex: 2,
    alignSelf: "center",
    margin: 60,
  },
});
