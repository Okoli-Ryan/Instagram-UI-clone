//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Hacker from "../../assets/icons/hacker.png";
import FollowButton from "../commons/followButton";

// create a component
const SendRenderItem = () => {
  return (
    <View style={{ width: "100%", flexDirection: "row", marginVertical: 8 }}>
      <View style={{ flexDirection: "row", width: "70%" }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Image
            source={Hacker}
            style={{ width: 34, height: 34, borderRadius: 17 }}
          />
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "Hel", fontSize: 14, color: "#111" }}>
            Alex Seeks
          </Text>
          <Text
            style={{
              fontFamily: "Hel_Light",
              fontSize: 12,
              color: "#666",
            }}>
            al3xis_
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          flexDirection: "row",
          width: "30%",
          alignItems: "center",
          paddingRight: 24,
        }}>
        <FollowButton textActive="Sent" textPassive="Send" />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default SendRenderItem;
