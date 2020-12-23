import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";
import firebase from "firebase";
import TitleBar from './TitleBar';

function Profile({ navigation }) {
  const [name, setName] = useState(" ");
  const [facID, setFacID] = useState(" ");
  const [email, setEmail] = useState(" ");

  useEffect(() => {
    var user = firebase.auth().currentUser;

    if (user) {
      console.log(user.uid);
    } else {
      console.log("No user");
    }

    let details = firebase.database().ref("users").child(`${user.uid}`);
    details.on("value", (val) => {
      setName(val.child("name").val());
      setFacID(val.child("facID").val());
      setEmail(val.child("email").val());
    });
    // return () => {
    //   cleanup;
    // };
  }, []);

  return (
    <View style={styles.container}>
      <TitleBar navigation={navigation}/>
      <View style={styles.page}>
        <Text style={styles.text}>Good Morning ma'am</Text>
        {/*time*/}
        <DataTable styles={styles.card}>
          {/* <DataTable.Header>
            <DataTable.Title>Dessert</DataTable.Title>
            <DataTable.Title numeric>Calories</DataTable.Title>
            <DataTable.Title numeric>Fat</DataTable.Title>
          </DataTable.Header> */}

          <DataTable.Row>
            <DataTable.Cell>Name</DataTable.Cell>
            <DataTable.Cell numeric>{name}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>FacID</DataTable.Cell>
            <DataTable.Cell numeric>{facID}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>EmailID</DataTable.Cell>
            <DataTable.Cell numeric>{email}</DataTable.Cell>
          </DataTable.Row>

          {/* <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={(page) => {
              console.log(page);
            }}
            label="1-2 of 6"
          /> */}
        </DataTable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    padding: 100,
    margin: 10,
  },
  icon: {},
  text: {
    padding: 50,
    margin: 10,
    alignSelf: "center",
    fontSize: 25,
  },
  page: {
    padding: 10,
    flex: 15,
    backgroundColor: "white",
  },
});

export default Profile;
