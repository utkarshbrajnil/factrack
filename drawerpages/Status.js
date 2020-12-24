import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";
import TitleBar from "./TitleBar";

const DATA = [
  {
    id: 1,
    title: "Available",
  },
  {
    id: 2,
    title: "Busy",
  },
  {
    id: 3,
    title: "At college",
  },
  {
    id: 4,
    title: "Hello",
  },
  {
    id: 5,
    title: "Hi",
  },
  {
    id: 6,
    title: "Call if urgent",
  },
  {
    id: 7,
    title: "Do Not Disturb",
  },
  {
    id: 8,
    title: "Idle",
  },
  {
    id: 9,
    title: "In a meeting",
  },
];

function Status({ navigation }) {
  const [currentStatus, SetCurrentStatus] = useState("");
  const renderItem = ({ item }) => <Item title={item.title} />;

  const Item = ({ title }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => SetCurrentStatus(title)}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TitleBar navigation={navigation} />
      <View style={styles.page}>
        <Text>Status is currently set to: </Text>
        <View style={{ width: "100%", height: 40, borderWidth: 1, marginBottom: 20 }}>
          <TextInput value={currentStatus}/>
        </View>

        <View style={{ marginBottom: 20 }}>
          <FlatList
            data={DATA}
            contentContainerStyle={{marginBottom: 20, paddingBottom: 20}}
            ListFooterComponent={<View style={{ height: 0, marginBottom: 40 }} />}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
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

  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
  },
});
export default Status;
