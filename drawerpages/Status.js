import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Button,
} from "react-native";
import TitleBar from "./TitleBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

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
  const [isModalVisible, setModalVisible] = useState(false);

  // const toggleModalVisibility = () => {
  //   setModalVisible(!isModalVisible);
  // };

  const showModal = () => {
    setModalVisible(true);
    return <ModalStatus />;
  };

  const renderItem = ({ item }) => <Item title={item.title} />;

  const Item = ({ title }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => SetCurrentStatus(title)}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TitleBar navigation={navigation} />
      <View style={styles.page}>
        <Text>Status is currently set to: </Text>
        <View
          style={{
            width: "100%",
            height: 50,
            paddingHorizontal: 10,
            borderWidth: 1,
            marginTop: 10,
            marginBottom: 20,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput style={{ flex: 5, fontSize: 20 }} value={currentStatus} />
          <TouchableOpacity
            style={{ flex: 0.5 }}
            
          >
            <Icon name="pencil" color="#636363" size={30} />
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 20 }}>
          <FlatList
            data={DATA}
            ItemSeparatorComponent={() => FlatListItemSeparator()}
            contentContainerStyle={{ marginBottom: 20, paddingBottom: 20 }}
            ListFooterComponent={
              <View style={{ height: 0, marginBottom: 40 }} />
            }
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
    backgroundColor: "#fafafa",

    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#3E3973",
  },
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  bottin: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: "white",
      alignItems: "center",
      marginVertical: 7,
      borderWidth:1,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
export default Status;
