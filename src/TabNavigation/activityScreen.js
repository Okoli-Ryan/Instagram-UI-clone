//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SectionList,
  Image,
} from "react-native";
import Hacker from "../assets/icons/hacker.png";
import Post from "../assets/images/cardImage.jpg";
import FollowButton from "../components/commons/followButton";

// create a component
const DATA = [
  {
    title: "New",
    data: [
      { name: "okoli_ryan", following: false },
      { name: "cristiano_R", following: true },
      { name: "SC30", following: true },
    ],
  },
  {
    title: "This month",
    data: [
      { name: "Selene G", following: true },
      { name: "Michael James", following: true },
      { name: "NBATV", following: false },
    ],
  },
  {
    title: "Last month",
    data: [
      { name: "Dynamo", following: false },
      { name: "BirdmanXer", following: false },
      { name: "dumYname", following: true },
    ],
  },
  {
    title: "Last year",
    data: [
      { name: "MaskedClown", following: true },
      { name: "xCp2019", following: false },
    ],
  },
];

const ActivityScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar color="#fff" />

      <SectionList
        ListHeaderComponent={() => (
          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
            <Text style={{ fontFamily: "Lobster", fontSize: 24 }}>
              Activity
            </Text>
          </View>
        )}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              marginVertical: 8,
              alignItems: "flex-start",
            }}>
            <View style={{ flexDirection: "row", width: "70%" }}>
              <View style={{ paddingHorizontal: 16 }}>
                <Image
                  source={Hacker}
                  style={{ width: 36, height: 36, borderRadius: 18 }}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flex: 1,
                  // backgroundColor: "red",
                }}>
                <Text
                  style={{
                    fontFamily: "Hel_Light",
                    fontSize: 14,
                    lineHeight: 18,
                    color: "#111",
                  }}>
                  <Text style={{ fontFamily: "Hel" }}>{item.name}</Text>
                  {item.following
                    ? " replied to your message on his post: when does the party start?"
                    : ", who you might know is on instagram."}
                  <Text style={{ color: "#888" }}> 4d</Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                alignSelf: "flex-start",
                marginLeft: "auto",
                flexDirection: "row",
                alignItems: "center",
                paddingRight: 24,
              }}>
              {item.following ? (
                <FollowButton />
              ) : (
                <Image
                  source={Post}
                  style={{
                    width: 48,
                    height: 48,
                    paddingHorizontal: 16,
                    paddingVertical: 5,
                  }}
                />
              )}
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={{
              fontFamily: "Hel_Light",
              paddingHorizontal: 16,
              paddingVertical: 16,
            }}>
            {title}
          </Text>
        )}
      />
    </View>
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
export default ActivityScreen;
