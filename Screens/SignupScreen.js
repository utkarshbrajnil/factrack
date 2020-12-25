import React, { useState } from "react";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";
import LottieView from "lottie-react-native";

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

export default function SignupScreen({ navigation }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    facID: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
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

  const textNameChange = (val) => {
    if (val.trim().length >= 2) {
      setData({
        ...data,
        name: val,
      });
    }
  };

  const textfacIDChange = (val) => {
    if (val.trim().length >= 2) {
      setData({
        ...data,
        facID: val,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
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

  const createProfile = (navigation) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(
        () => {
          alert("Account created successfully");
          firebase
            .database()
            .ref(`users/${firebase.auth().currentUser.uid}`)
            .set({
              name: data.name,
              facID: data.facID,
              email: data.email,
              password: data.password,
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
      <View style={styles.container}>
        <StatusBar backgroundColor="#312E5C" barStyle="light-content" />
        <View style={styles.header}>
          <LottieView
            loop
            autoPlay
            // height={400}
            // width={400}
            source={require("../assets/welcome.json")}
          />
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          duration={1000}
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
              keyboardType="email-address"
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

          <View style={styles.action}>
            <Icon name="lock" color="#636363" size={30} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#636363"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: "black",
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 6 characters long.
              </Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <Icon name="account-outline" color="#636363" size={30} />
            <TextInput
              placeholder="Your Name"
              placeholderTextColor="#636363"
              style={[
                styles.textInput,
                {
                  color: "black",
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => textNameChange(val)}
            />
          </View>

          <View style={styles.action}>
            <Icon name="fingerprint" color="#636363" size={30} />
            <TextInput
              placeholder="Your facultyID"
              placeholderTextColor="#636363"
              keyboardType="number-pad"
              style={[
                styles.textInput,
                {
                  color: "black",
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => textfacIDChange(val)}
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => createProfile()}
            >
              <LinearGradient
                colors={["#635CB8", "#312E5C"]}
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
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={[
                styles.signIn,
                {
                  borderColor: "#312E5C",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#312E5C",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#312E5C",
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 3,
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
    borderBottomColor: "#312E5C",
    paddingBottom: 5,
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
    marginBottom: -10,
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
    //backgroundColor: "#fafafa",
  },
});
