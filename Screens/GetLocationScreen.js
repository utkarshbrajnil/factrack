import React, { useState, useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function GetLocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
 

  useEffect(() => {
    (async () => {
        
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
        }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontFamily: 'sans-serif-condensed', marginRight: 15, fontSize: 20}}>Enable location sharing</Text>
      {console.log({location})}
    </View>
  );
  console.log(location);
}

