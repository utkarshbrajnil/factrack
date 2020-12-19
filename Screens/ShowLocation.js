import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, StatusBar } from "react-native";
import * as Location from "expo-location";
import { SearchBar } from "react-native-elements";
import * as firebase from "firebase";

const height = StatusBar.currentHeight;

const ShowLocation = () => {
  const LATITUDE_DELTA = 0.009;
  const LONGITUDE_DELTA = 0.009;
  const LATITUDE = 18.7934829;
  const LONGITUDE = 98.9867401;

  const [latitude, setLatitude] = useState(LATITUDE);
  const [longitude, setLongitude] = useState(LONGITUDE);
  const [search, updateSearch] = useState("");
  const [error, setError] = useState("");

  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      navigator.geolocation.watchPosition(
        (position) => {
          console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
        },
        (error) => setError(error.message),
        {
          enableHighAccuracy: true,
          timeout: 200000,
          maximumAge: 1000,
          distanceFilter: 10,
        }
      );
    })();
  }, []);

  async function fetchData() {
    let lati = await firebase
      .database()
      .ref("users")
      .child(search)
      .child("coords")
      .child("latitude");
    let longi = await firebase
      .database()
      .ref("users")
      .child(search)
      .child("coords")
      .child("longitude");
    lati.on("value", (lat) => {
      setLatitude(lat.val());
    });
    longi.on("value", (long) => {
      setLongitude(long.val());
    });
  }

  return (
    <>
      <SearchBar
        returnKeyType="search"
        autoCorrect={false}
        placeholder="Search for a teacher..."
        onChangeText={(term) => updateSearch(term)}
        onSubmitEditing={() => fetchData()}
        value={search}
        containerStyle={styles.searchbar}
        inputContainerStyle={styles.searchInput}
      />

      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        region={region}
      >
        <Marker
          coordinate={region}
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
    marginTop: height,
    justifyContent: "center",
  },

  searchInput: {
    borderRadius: 10,
  },
});

export default ShowLocation;
