import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TitleBar from "./TitleBar";
import { Icon } from "react-native-elements";
import { Form, Input, Item, Button } from "native-base";
import * as firebase from 'firebase'

function ChangePassword({ navigation }) {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [oldPass, setOldPass] = useState("");

  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  const updatePassword = () => {
    if (pass1 !== pass2) {
      alert("The passwords don't match!!");
      return;
    }

    reauthenticate(oldPass)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(pass1)
          .then(() => {
            alert("Password updated!");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TitleBar navigation={navigation} />
      <View style={styles.page}>
        <Text style={styles.heading}> Change Password</Text>
        <Form style={styles.form}>
          <Item rounded style={{ backgroundColor: "black" }}>
            <Icon name="email" style={{ marginLeft: 10 }} color="white" />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              value={oldPass}
              placeholderTextColor="white"
              placeholder="Enter old password"
              style={{ color: "white" }}
              onChangeText={(pass) => setOldPass(pass)}
            />
          </Item>

          <Item
            rounded
            style={{
              marginTop: 10,
              backgroundColor: "black",
            }}
          >
            <Icon name="lock" style={{ marginLeft: 10 }} color="white" />
            <Input
              secureTextEntry
              placeholderTextColor="white"
              placeholder="Choose a new password"
              value={pass1}
              style={{ color: "white" }}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(pass) => setPass1(pass)}
            />
          </Item>
          <Item
            rounded
            style={{
              marginTop: 10,
              backgroundColor: "black",
            }}
          >
            <Icon name="lock" style={{ marginLeft: 10 }} color="white" />
            <Input
              secureTextEntry
              placeholderTextColor="white"
              placeholder="Confirm new password"
              style={{ color: "white" }}
              value={pass2}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(pass) => setPass2(pass)}
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
              updatePassword();
              setOldPass('');
              setPass1('');
              setPass2('');
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
              Update password
            </Text>
          </Button>
        </Form>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 10,
    flex: 15,
    backgroundColor: "white",
    justifyContent: "center",
  },

  form: {
    marginVertical: 20,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },

  heading: {
    alignSelf: "center",
    fontSize: 24,
  },
});
export default ChangePassword;
