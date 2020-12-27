import React from 'react'
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

function TitleBar({navigation}) {
    return (
        <View style={styles.titlebar}>
        <Icon
          style={styles.icon}
          name="menu"
          size={38}
          color="#fafafa"
          style={{ paddingLeft: 20 }}
          onPress={() => navigation.openDrawer()}
        />
      </View>
    )
}

const styles=StyleSheet.create({
titlebar: {
    //marginTop: 24,
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#7c73e6",
    alignItems: "center",
    paddingLeft: 10,
  },
});

export default TitleBar
