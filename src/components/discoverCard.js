//import liraries
import React, { Component } from "react";
import Lady from "../assets/images/lady2.jpg";
import MIcons from "react-native-vector-icons/MaterialIcons";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// create a component
const DiscoverCard = () => {
  return (
    <View style={styles.container}>
      <MIcons
        name="close"
        size={20}
        color="#888"
        style={{ position: "absolute", right: 8, top: 4 }}
      />
      <Image
        source={Lady}
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 8 }}
      />
      <Text style={{ fontFamily: "Hel_Light" }} numberOfLines={1}>
        Josephine Olajiga
      </Text>
      <Text style={{ fontFamily: "Hel_Light", fontSize: 10, color: "#333" }}>
        Followed by
      </Text>
      <Text style={{ fontFamily: "Hel_Light", fontSize: 10, color: "#333" }}>
        Mike James + 6 more
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 4,
          width: "100%",
          borderRadius: 4,
          backgroundColor: "#4596ff",
        }}>
        <Text
          style={{
            fontFamily: "Hel_Light",
            color: "#fff",
            marginBottom: 4,
            textAlign: "center",
            paddingVertical: 4,
          }}>
          Follow
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    width: 160,
    marginRight: 4,
    paddingHorizontal: 16,
    position: "relative",
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 6,
    borderColor: "rgba(0,0,0,.2)",
  },
});

//make this component available to the app
export default DiscoverCard;
