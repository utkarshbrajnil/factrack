import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';
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
    const [search, updateSearch] = useState('');
    const [lat, setLat] = useState(23.4685);
    const [long, setLong] = useState(74.09765);

    useEffect(() => {
        //firebase.initializeApp(firebaseConfig);

        async function fetchData() {
          
          const response = await firebase.database().ref("faculties");
            // response.on("value", snap => {
            //     console.log(snap);
            // })
        }
        fetchData();
      }, []);

    return(
        <>
            <SearchBar
                placeholder="Search for a teacher..."
                onChangeText={term => updateSearch(term)}
                value={search}
                containerStyle={styles.searchbar}
                inputContainerStyle={styles.searchInput}
            />
            
            <MapView 
                showsUserLocation
                style={styles.container} 
                initialRegion= {{
                    latitude: 19.6372,
                    longitude: 72.998,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                }}
                mapType="standard"
            />
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
