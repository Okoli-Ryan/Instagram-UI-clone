//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import Iicons from "react-native-vector-icons/Ionicons";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Hacker from "../assets/icons/hacker.png";

class User {
  constructor(name, message) {
    this.name = name;
    this.message = message;
  }
}

const data = [
  new User(
    "NbaTV",
    "Steph Curry has broken the 3pt point record, this some Greatest of all time kinda stuff"
  ),
  new User("Alex Seeks", "What's good bruv?"),
  new User("Nma Uchenna", "How does this even work?"),
  new User("Ugo Okoli", "up by midnight coding this"),
  new User("NbaTV1", "Steph Curry has broken the 3pt point record"),
  new User("Alex Seeks1", "What's good bruv?"),
  new User("Nma Uchenna1", "How does this even work?"),
  new User("Ugo Okoli1", "up by midnight coding this"),
  new User("NbaTV2", "Steph Curry has broken the 3pt point record"),
  new User("Alex Seeks2", "What's good bruv?"),
  new User("Nma Uchenna2", "How does this even work?"),
  new User("Ugo Okoli3", "up by midnight coding this"),
  new User("NbaTV3", "Steph Curry has broken the 3pt point record"),
  new User("Alex Seeks3", "What's good bruv?"),
  new User("Nma Uchenna3", "How does this even work?"),
  new User("Ugo Okoli4", "up by midnight coding this"),
];

// create a component
const MessagesScreen = () => {
  return (
    <FlatList
      data={data}
      contentContainerStyle={{ backgroundColor: "#fff" }}
      keyExtractor={(item) => item.name}
      ListHeaderComponent={() => (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            backgroundColor: "#fff",
            justifyContent: "flex-start",
            paddingVertical: 16,
          }}>
          <View
            style={{
              position: "relative",
              width: "100%",
              marginBottom: 4,
              justifyContent: "flex-end",
            }}>
            <MCIcons
              name="magnify"
              color="#aaa"
              size={18}
              style={{ position: "absolute", top: 10, left: 24, zIndex: 2 }}
            />
            <View
              style={{
                paddingHorizontal: 16,
                alignItems: "flex-start",
              }}>
              <TextInput
                placeholder="Search"
                style={{
                  paddingVertical: 4,
                  fontFamily: "Hel_Light",
                  paddingLeft: 40,
                  paddingRight: 30,
                  backgroundColor: "#eee",
                  borderRadius: 10,
                  width: "100%",
                }}
              />
            </View>
          </View>
        </View>
      )}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: "row",
            marginVertical: 8,
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View
            style={{
              flexDirection: "row",
              width: "70%",
            }}>
            <View style={{ paddingHorizontal: 16 }}>
              <Image
                source={Hacker}
                style={{ width: 42, height: 42, borderRadius: 21 }}
              />
            </View>
            <View
              style={{
                width: "100%",
              }}>
              <Text style={{ fontFamily: "Hel", color: "#111" }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Hel_Light",
                    color: "#666",
                    width: "70%",
                  }}>
                  {item.message}
                </Text>
                <Text style={{ color: "#888", marginLeft: 4 }}>2w</Text>
              </View>
            </View>
          </View>
          <Iicons
            name="camera-outline"
            size={24}
            color="#888"
            style={{ paddingHorizontal: 16 }}
          />
        </View>
      )}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

//make this component available to the app
export default MessagesScreen;
