import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';
import { Marker } from 'react-native-maps'
import firebaseConfig from '../firebaseConfig'

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreAllLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const height = StatusBar.currentHeight;


const ShowLocation = () => {
    const LAD = 0.1;
    const LOD = 0.5;
    const [search, updateSearch] = useState('');
    const [lat, setLat] = useState();
    const [long, setLong] = useState();
    // var [region, setRegion] = useState({
    //     latitude: lat,
    //     longitude: long,
    //     latitudeDelta: LAD,
    //     longitudeDelta: LOD
    //   });
    async function fetchData(){
          
        let lati = await firebase.database().ref("faculties").child(search).child("latitude");
        let longi = await firebase.database().ref("faculties").child(search).child("longitude");
           lati.on("value", lat => {
           setLat(lat.val());
           });
           longi.on("value", long => {
            setLong(long.val());
        });

      }

    

    return(
        <>
            <SearchBar
                returnKeyType='search'
                placeholder="Search for a teacher..."
                onChangeText={term => updateSearch(term)}
                onSubmitEditing={() => fetchData()}
                value={search}
                containerStyle={styles.searchbar}
                inputContainerStyle={styles.searchInput}
            />
            
            <MapView
                style={styles.container}
                region={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LAD,
                    longitudeDelta: LOD
                  }}
                
            >
                    <Marker 
                        coordinate={{ latitude: lat, longitude: long }} 
                        title={search}
                        description="Currently at this location"
                    />
            </MapView>
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        alignItems: "center",
        justifyContent: "center"
    },

    searchbar: {
        justifyContent: 'center',
        marginTop: height,
    },

    searchInput: {
        borderRadius: 10,
    }
})



export default ShowLocation;
