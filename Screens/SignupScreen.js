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

// firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // if already initialized, use that one
// }

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
        <StatusBar backgroundColor="#7c73e6" barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.Image
            resizeMode="stretch"
            style={styles.logo}
            source={require("../assets/welcome.png")}
            animation="bounceIn"
            duration={1500}
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
            <Icon name="mail" color="black" size={25} />
            <TextInput
              keyboardType="email-address"
              placeholder="Your Email"
              placeholderTextColor="#666666"
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
            <Icon name="lock" color="black" size={25} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
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
            <Icon name="lock" color="black" size={25} />
            <TextInput
              placeholder="Your Name"
              placeholderTextColor="#666666"
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
            <FontAwesome name="meetup" color="black" size={25} />
            <TextInput
              placeholder="Your facultyID"
              placeholderTextColor="#666666"
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
                colors={["#B0ABF0", "#7c73e6"]}
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
                  borderColor: "#7c73e6",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#7c73e6",
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
    backgroundColor: "#7c73e6",
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
    borderBottomColor: "#7c73e6",
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
    color: "#05375a",
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
