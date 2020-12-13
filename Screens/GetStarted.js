import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Svg, { Ellipse } from "react-native-svg";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

export default function GetStarted({navigation}){
    return <View style={styles.container}>
    <View style={styles.ellipseStack}>
      <Svg viewBox="0 0 531.87 281.13" style={styles.ellipse}>
        <Ellipse
          fill="#005792"
          cx={266}
          cy={141}
          rx={266}
          ry={141}
        ></Ellipse>
      </Svg>
      <Image
        source={require("../assets/img1.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
    </View>
    <Text style={styles.welcomeTo}>Welcome to</Text>
    <Text style={styles.teacherTracker}>Teacher Tracker</Text>
    <View style={styles.icon2Row}>
        <IoniconsIcon
          name="md-information-circle-outline"
          style={styles.icon2}
          onPress={
            () => {
              
              console.log("ABOUT THE APP");
              navigation.navigate('About');
            }
          }
        ></IoniconsIcon>
        <IoniconsIcon
          name="arrow-forward-circle"
          style={styles.icon}
          onPress= {
            ()=>{
              console.log("NEXT PAGE");
              navigation.navigate('Options');
            }
          }
        ></IoniconsIcon>
      </View>
  </View>;
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "rgba(217,250,255,1)"
      },
      ellipse: {
        top: 15,
        left: 0,
        width: 532,
        height: 281,
        position: "absolute",
        transform: [
          {
            rotate: "-24.00deg"
          }
        ],
        opacity: 0.50
      },
      image: {
        top: 0,
        left: 102,
        width: 328,
        height: 331,
        position: "absolute"
      },
      ellipseStack: {
        width: 532,
        height: 331,
        marginTop: 97,
        marginLeft: -86
      },
      welcomeTo: {
        color: "#00204a",
        textAlign: "center",
        fontSize: 38,
        opacity: 0.42,
        marginTop: 20,
        alignSelf: "center"
      },
      teacherTracker: {
        fontWeight: 'bold',
        color: "#00204a",
        fontSize: 45,
        marginTop: 8,
        alignSelf: "center"
      },
      icon2: {
        color: "rgba(0,187,240,1)",
        fontSize: 48
      },
      icon: {
        color: "rgba(0,187,240,1)",
        fontSize: 48,
        marginLeft: 169
      },
      icon2Row: {
        height: 53,
        flexDirection: "row",
        marginTop: 78,
        marginLeft: 52,
        marginRight: 62
      }
});