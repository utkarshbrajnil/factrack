import React, { useState, useEffect, Children } from 'react';
import { Platform, Text, View,StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Button } from 'native-base';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig'


export default function GetLocationScreen({route,navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
 

  useEffect(() => {
    (async () => {
        //   if (!firebase.apps.length) {
        //     firebase.initializeApp(firebaseConfig);
        //  }else {
        //     firebase.app(); // if already initialized, use that one
        //  }
    try
    {
      const data = await firebase.database().ref(`users`)
      data.on('value',user=>{
        console.log(user);
      })
    }
    catch(e){
      console.log(e);
    }

    }, [])
  }
  )
      
  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  const storeLocation  = async () =>{
    let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
        }

        var lat=0;
        var long=0

        let loc = await Location.getCurrentPositionAsync({})
          setLocation(loc);
        //console.log(location);
        lat = location["coords"]["latitude"]
        long = location["coords"]["longitude"]
        console.log(lat,long)
        
        if(lat==0 && long==0)
        console.log("no")
        else{
          const user = await firebase.database().ref(`users/${id}/coords`).set(
            {
                latitude:lat,
                longitude: long,
            }
          )

        }
  
        
        
      }
      
      const { id } = route.params;
 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enable location sharing</Text>
      
      <Button full
                success
                style={styles.btn}  
                onPress={()=>{
                  storeLocation()
                  //console.log(id);
                  
                }}
            >
                <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold', color: '#cccccc'}}>Get Location</Text>
      </Button>
    </View>
  );
  console.log(location);
}


const styles=StyleSheet.create({
  container:{
    flex: 1, 
    // flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  text:{
    fontFamily: 'sans-serif-condensed', 
    marginRight: 15, 
    fontSize: 20
  },
  btn:{
    marginTop: 40, 
    marginHorizontal:20,
    borderRadius: 20, 
    backgroundColor: '#0F2C52',
  }
})