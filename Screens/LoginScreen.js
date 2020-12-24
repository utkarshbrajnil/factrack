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

  const loginUser = (navigation) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {
          alert("Login Successful");
          navigation.navigate("GetLocation");
        },
        (error) => {
          alert(error.message);
        }
      );
  };

  return (
    <>
        <View style={styles.header}>
          <Text style={styles.text_header}>TrackIT.</Text>
        </View>

         <View style={styles.footer}>
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
        </View>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     justifyContent: "center",
//   },
//   header: {
//     flex: 1,
//     justifyContent: "flex-end",
//     paddingHorizontal: 20,
//     paddingBottom: 50,
//     backgroundColor: "black"
//   },
//   footer: {
//     flex: 3,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },

//   title: {
//     fontWeight: "bold",
//     fontSize: 60,
//     alignSelf: "center",
//     marginTop: 15,
//     color: "#FFB81D",
//     fontFamily: "sans-serif-condensed",
//   },

//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
//   image1: {
//     flex: 2,
//     alignSelf: "center",
//     margin: 60,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },

  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});
