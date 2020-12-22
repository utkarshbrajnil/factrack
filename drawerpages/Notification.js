import React from 'react';
import { Button, View, StyleSheet } from "react-native";


function Notification({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
      );
    }

export default Notification
