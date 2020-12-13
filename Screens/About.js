import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Ellipse } from "react-native-svg"; 
import IoniconsIcon from "react-native-vector-icons/Ionicons";

export default function About({navigation}){
    return  <View style={styles.container}>
    <View style={styles.ellipseStackStack}>
      <View style={styles.ellipseStack}>
        <Svg viewBox="0 0 323.69 323.69" style={styles.ellipse}>
          <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="rgba(0,187,240,1)"
            cx={162}
            cy={162}
            rx={162}
            ry={162}
          ></Ellipse>
        </Svg>
        <Text style={styles.aboutTheApp}>ABOUT THE APP</Text>
        <Text style={styles.loremIpsum}>
          This app was made to help the students {"\n"}to find the teachers.
          The app tracks the {"\n"}location of teachers and shows it in {"\n"}
          the map to help the students as well {"\n"}as the teachers to search
          one another {"\n"}quickly.
        </Text>
      </View>
      <IoniconsIcon 
        name="arrow-back-circle" 
        style={styles.icon}
        onPress= {
            ()=>{
              console.log("getting THE APP");
              navigation.goBack();
            }
          }>
      </IoniconsIcon>
    </View>
    <View style={styles.ellipse2Stack}>
      <Svg viewBox="0 0 94.03 94.03" style={styles.ellipse2}>
        <Ellipse
          stroke="rgba(230,230,230,1)"
          strokeWidth={0}
          fill="rgba(0,187,240,1)"
          cx={47}
          cy={47}
          rx={47}
          ry={47}
        ></Ellipse>
      </Svg>
      <Svg viewBox="0 0 70.52 70.52" style={styles.ellipse3}>
        <Ellipse
          stroke="rgba(230, 230, 230,1)"
          strokeWidth={0}
          fill="rgba(0,87,146,1)"
          cx={35}
          cy={35}
          rx={35}
          ry={35}
        ></Ellipse>
      </Svg>
    </View>
    <Text style={styles.aboutUs}>ABOUT US</Text>
    <Text style={styles.loremIpsum2}>
      Made with love by-{"\n"}~Arnab Biswas{"\n"}~Aryan Thakre{"\n"}~Utkarsh Brajnil
    </Text>
  </View>;
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(217,250,255,1)"
      },
      ellipse: {
        top: 0,
        left: 177,
        width: 324,
        height: 324,
        position: "absolute"
      },
      aboutTheApp: {
        top: 278,
        left: 0,
        position: "absolute",
        color: "rgba(0,32,74,1)",
        fontSize: 25
      },
      loremIpsum: {
        top: 323,
        position: "absolute",
        color: "rgba(0,32,74,1)",
        fontSize: 18,
        textAlign: "left",
        left: 0,
        lineHeight: 25
      },
      ellipseStack: {
        top: 0,
        left: 0,
        width: 501,
        height: 472,
        position: "absolute"
      },
      icon: {
        top: 162,
        left: 7,
        position: "absolute",
        color: "rgba(0,187,240,1)",
        fontSize: 40
      },
      ellipseStackStack: {
        width: 501,
        height: 472,
        marginTop: -92,
        marginLeft: 15
      },
      ellipse2: {
        top: 15,
        left: 0,
        width: 94,
        height: 94,
        position: "absolute"
      },
      ellipse3: {
        top: 0,
        left: 35,
        width: 71,
        height: 71,
        position: "absolute"
      },
      ellipse2Stack: {
        width: 106,
        height: 109,
        marginTop: 230,
        marginLeft: 22
      },
      aboutUs: {
        color: "rgba(0,32,74,1)",
        fontSize: 25,
        marginTop: -259,
        marginLeft: 176
      },
      loremIpsum2: {
        color: "#121212",
        fontSize: 19,
        lineHeight: 25,
        marginTop: 11,
        marginLeft: 176
      }
});
