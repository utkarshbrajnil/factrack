import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import firebase from 'firebase';
// import firebaseConfig from '../firebaseConfig'


export default function GetLocationScreen({route,navigation}) {
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log(errorMsg)
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
       console.log("useEffect called");

       const { name } = route.params;

       var lat = location["coords"]["latitude"]
            var long = location["coords"]["longitude"]
            console.log(lat,long)
          
          await firebase.database().ref(`users/${name}/coords`).set(
                  {
                      latitude:lat,
                      longitude: long,
                  }
                )
             
    })();
        }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enable location sharing</Text>
    </View>
  );
 }


const styles=StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  text:{
    fontFamily: 'sans-serif-condensed', 
    marginRight: 15, 
    fontSize: 20
  },
});