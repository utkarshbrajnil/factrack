import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Button } from "native-base";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const image = require("../assets/optionBG.png");

export default function OptionsPage({ navigation }) {
  const [choice, setChoice] = useState(require("../assets/unknown.png"));
  const [person, setPerson] = useState("Choose an option");

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#312E5C" barStyle="light-content" />
      <View style={styles.header}>
        <Image style={{ height: 250, width: 250, flex: 1, borderRadius: 20 }} source={choice} />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={1000}
        style={[
          styles.footer,
          {
            backgroundColor: "#ffe9e3",
          },
        ]}
      >
        <Text style={styles.optionText}>
          {person === "Choose an option" ? person : `I am a ${person}`}
        </Text>

        <View style={styles.parentview}>
          <TouchableOpacity
            onPress={() => {
              setChoice(require("../assets/teacher.png"));
              setPerson("Teacher");
            }}
          >
            <View style={styles.optionview}>
              <Image
                style={{ height: 200, width: 180, flex: 1 }}
                source={require("../assets/teacher.png")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
          
            onPress={() => {
              setChoice(require("../assets/student.png"));
              setPerson("Student");
            }}
          >
            <View style={styles.optionview}>
              <Image
                style={{ height: 200, width: 180, flex: 1 }}
                source={require("../assets/student.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              if (person == "Teacher") navigation.navigate("Login");
              else if (person == "Student") navigation.navigate("Show");
              else alert("Please select a choice ");
            }}
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
                Next
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 2,
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    
  },
  footer: {
    flex: 3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#312E5C",
  },

  parentview: {
    flex: 1,
    // backgroundColor:'blue',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  
  optionview: {
    borderRadius: 30,
    // elevation: 20,
    height: 100,
    marginHorizontal: 5,
    backgroundColor: "white",
    overflow: "hidden",
    borderBottomWidth: 1,
    borderRightWidth:1,
    borderColor: "#312E5C",
    
  },
  optionText: {
    fontSize: 30,
    alignSelf: "center",
    color: "#312E5C",
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    marginTop: 30,
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
});
