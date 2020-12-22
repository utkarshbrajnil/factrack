import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titlebar}>
        <Icon
          style={styles.icon}
          name="menu"
          size={38}
          color="black"
          style={{ paddingLeft: 20 }}
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <View style={styles.page}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titlebar: {
    marginTop: 24,
    flexDirection: "row",
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    paddingLeft: 10,
  },
  icon: {},
  page: {
    flex: 15,
    backgroundColor: "white",
  },
});

export default HomeScreen;

