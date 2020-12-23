import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import TitleBar from "./TitleBar";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TitleBar navigation={navigation} />
      {/* <Button onPress={() => navigation.goBack()} title="Go back home" /> */}
      <View style={styles.page}>
        <Text> HOMEPAGE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    flex: 15,
    backgroundColor: "white",
  },
});
export default HomeScreen;