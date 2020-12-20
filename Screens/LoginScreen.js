import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { Icon } from "react-native-elements";
import { Container, Form, Input, Item, Button } from "native-base";
import firebase from "firebase";

const image = {
  uri:
    "https://i.pinimg.com/originals/b9/16/73/b91673c3e31d8b688d4b5e28769eba67.png",
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = (navigation) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {
          alert("Login Successful");
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
          <Image
            source={require("../assets/Avatar.png")}
            resizeMode="contain"
            style={styles.image1}
          />
          <Text style={styles.title}>TrackIT.</Text>
          <Form style={{ marginVertical: 20, paddingHorizontal: 10 }}>
            <Item
              rounded
              style={{ backgroundColor: "rgba(184, 196, 212,0.4)" }}
            >
              <Icon
                name="email"
                style={{ marginLeft: 10, opacity: 0.6 }}
                color="white"
              />
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
              <Icon
                name="lock"
                style={{ marginLeft: 10, opacity: 0.6 }}
                color="white"
              />
              <Input
                secureTextEntry
                placeholderTextColor="white"
                placeholder="Enter password"
                style={{ color: "white" }}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(pass) => setPassword(pass)}
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
              onPress={() => loginUser(navigation)}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#cccccc",
                }}
              >
                Log In
              </Text>
            </Button>

            <Button
              full
              transparent
              style={{ marginTop: 40, borderRadius: 20, marginTop: 5 }}
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={{ color: "white", fontSize: 22, color: "#0F2C52" }}>
                New user?{" "}
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Sign Up
                </Text>
              </Text>
            </Button>
          </Form>
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

  title: {
    fontWeight: "bold",
    fontSize: 60,
    alignSelf: "center",
    marginTop: 15,
    color: "#FFB81D",
    fontFamily: "sans-serif-condensed",
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
