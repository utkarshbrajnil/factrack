import React from 'react';
import {View,Text, StyleSheet} from "react-native";
import TitleBar from "./TitleBar";

function Status({navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <TitleBar navigation={navigation}/>
            <View style={styles.page}>
        <Text> Status</Text>
      </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 10,
        flex: 15,
        backgroundColor: "white",
      },
});
export default Status