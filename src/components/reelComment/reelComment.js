//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Avatar from "../../assets/icons/hacker.png";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SingleComment from "./singleComment";

// create a component
const data = [
  "blue",
  "red",
  "tomato",
  "green",
  "white",
  "black",
  "#34aaee",
  "#fafcce",
];
const ReelComment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View>
            <MCIcon
              name="keyboard-backspace"
              size={24}
              color="black"
              style={{ paddingLeft: 16, paddingRight: 8 }}
            />
          </View>
          <Text style={styles.comments}>Comments</Text>
        </View>
        <View
          style={{
            width: "40%",
            alignItems: "flex-end",
            paddingHorizontal: 16,
          }}>
          <Feather name="send" size={24} color="black" />
        </View>
      </View>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={data}
        ListHeaderComponent={() => (
          <View style={styles.commentsHeader}>
            <View style={{ paddingHorizontal: 8 }}>
              <Image
                source={Avatar}
                style={{
                  padding: 8,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                }}></Image>
            </View>
            <View
              style={{
                marginLeft: 4,
              }}>
              <Text style={{ fontFamily: "Hel", fontSize: 14 }}>
                seratoninsupplement
              </Text>
              <Text
                numberOfLines={2}
                style={{ fontFamily: "Hel_Light", fontSize: 14 }}>
                These are the best teachers
              </Text>
              <Text
                style={{
                  fontFamily: "Hel",
                  marginTop: 8,
                  fontSize: 12,
                  color: "#888",
                }}>
                5h
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <SingleComment />}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
  },
  comments: {
    fontFamily: "Hel",
    color: "black",
    fontSize: 18,
    paddingHorizontal: 16,
  },
  headerLeft: {
    width: "60%",
    alignItems: "center",
    flexDirection: "row",
  },
  commentsHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 16,
    paddingTop: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#888",
  },
});

//make this component available to the app
export default ReelComment;
