import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

export default NewLocation = () => {
  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log(position);

    //     setLatitude(position.coords.latitude);
    //     setLongitude(position.coords.longitude);
    //   },
    //   (error) => console.log(error)
    // ),
    //   { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 };

    navigator.geolocation.watchPosition(
        (position) => {
          const { lat, long } = position.coords;
          setLatitude(lat);
          setLongitude(long);
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10,
        }
      );
  });

  const LATITUDE_DELTA = 0.009;
  const LONGITUDE_DELTA = 0.009;
  const LATITUDE = 18.7934829;
  const LONGITUDE = 98.9867401;

  const [latitude, setLatitude] = useState(LATITUDE);
  const [longitude, setLongitude] = useState(LONGITUDE);

  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <MapView style={styles.container} region={region}>
      <Marker coordinate={region} />
    </MapView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
