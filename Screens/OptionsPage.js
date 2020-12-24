import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button } from "native-base";

const image = require("../assets/optionBG.png");

export default function OptionsPage({ navigation }) {
  const [choice, setChoice] = useState(require("../assets/unknown.png"));
  const [person, setPerson] = useState("Choose an option");

  
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.avatar}>
          <Image style={{ height: 250, width: 250, flex: 1 }} source={choice} />
        </View>
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
                style={{ height: 250, width: 250, flex: 1 }}
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
                style={{ height: 250, width: 250, flex: 1 }}
                source={require("../assets/student.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Button
          full
          success
          style={{
            margin: 40,
            borderRadius: 20,
            backgroundColor: "#FFB81D",
          }}
          onPress={() => {
            if (person == "Teacher") navigation.navigate("Login");
            else if (person == "Student") navigation.navigate("Show");
            else alert("Please select a choice ");
          }}
        >
          <Text style={{ color: "#0F2C52", fontSize: 22, fontWeight: "bold" }}>
            Next
          </Text>
        </Button>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(217,250,255,1)",
  },
  avatar: {
    // flex:1,
    height: 250,
    width: 250,
    borderRadius: 125,
    backgroundColor: "white",
    // position: "absolute",
    top: 50,
    alignSelf: "center",
    overflow: "hidden",
  },
  parentview: {
    flex: 1,
    margin: 10,
    padding: 10,
    // backgroundColor:'blue',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  optionImage: {
    flex: 1,
    alignSelf: "center",
  },
  optionview: {
    borderRadius: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: "white",
    margin: 20,
    overflow: "hidden",
  },
  optionText: {
    fontSize: 30,
    alignSelf: "center",
    marginTop: 150,
    color: "#FFB81D",
    fontWeight: "bold",
  },
});
