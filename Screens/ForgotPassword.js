import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";
import LottieView from "lottie-react-native";

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

export default function ForgotPassword({ navigation }) {
  const [data, setData] = useState({
    email: "",
    check_textInputChange: false,
    isValidUser: true,
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const sendResetMail = () => {
    var auth = firebase.auth();

    auth
      .sendPasswordResetEmail(data.email)
      .then(function () {
        alert(`Password reset mail has been sent to ${data.email}`);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4A458A" barStyle="light-content" />
      <View style={styles.header}>
        <LottieView
          
          autoPlay
          height={400}
          width={400}
          source={require("../assets/forgotanimation.json")}
        />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: "#fafafa",
          },
        ]}
      >
        <View style={styles.action}>
          <Icon name="email-open-outline" color="#636363" size={30} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#636363"
            style={[
              styles.textInput,
              {
                color: "black",
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              email must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => sendResetMail()}
          >
            <LinearGradient
              colors={["#7c73e6", "#4A458A"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Send verification mail
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.signIn,
            {
              borderColor: "#4A458A",
              borderWidth: 1,
              marginTop: 15,
            },
          ]}
        >
          <Text
            style={[
              styles.textSign,
              {
                color: "#4A458A",
              },
            ]}
          >
            Back to login
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A458A",
  },
  header: {
    flex: 3,
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fafafa",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#4A458A",
    paddingBottom: 5,
    alignItems: "center"
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 15,
    marginBottom: -10
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },

  logo: {
    width: height_logo,
    height: height_logo,
  },
});
