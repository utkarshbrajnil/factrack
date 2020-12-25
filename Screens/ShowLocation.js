import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { SearchBar } from "react-native-elements";
import MapView from "react-native-maps";
import * as firebase from "firebase";
import { Marker } from "react-native-maps";

const height = StatusBar.currentHeight;

const ShowLocation = () => {
  const LAD = 0.1;
  const LOD = 0.5;
  const [search, updateSearch] = useState("");
  const [lat, setLat] = useState(22);
  const [long, setLong] = useState(22);

  async function fetchData() {
    let key = "";
    const data = await firebase.database().ref("users");
    if (data !== null) {
      data
        .orderByChild("name")
        .equalTo(search)
        .on("value", function (snapshot) {
          console.log(snapshot.val());
          snapshot.forEach(function (value) {
            console.log(value.key);
            key = value.key;
            console.log(typeof key);
          });
        });

      let lati = await firebase
        .database()
        .ref("users")
        .child(key)
        .child("coords")
        .child("latitude");
      let longi = await firebase
        .database()
        .ref("users")
        .child(key)
        .child("coords")
        .child("longitude");
      lati.on("value", (lat) => {
        setLat(lat.val());
      });
      longi.on("value", (long) => {
        setLong(long.val());
      });
    }
  }

  return (
    <>
      <SearchBar
        returnKeyType="search"
        placeholder="Search for a teacher..."
        onChangeText={(term) => updateSearch(term)}
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
          longitudeDelta: LOD,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: long }}
          title={search}
          description="Currently at this location"
        />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  searchbar: {
    justifyContent: "center",
  },

  searchInput: {
    borderRadius: 10,
  },
});

export default ShowLocation;
