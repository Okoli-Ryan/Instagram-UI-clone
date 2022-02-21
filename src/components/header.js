//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import Add from "../assets/icons/add.png";
import Send from "../assets/icons/send.png";

// create a component
const Header = ({ title, RightIcon, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <Text style={styles.text}>Instagram</Text>
      </View>
      <View style={[styles.headerContainer, styles.buttonContainer]}>
        <Button
          type="clear"
          icon={
            <Image
              source={Add}
              style={[styles.addButton, { marginRight: 8 }]}
            />
          }
        />
        <Button
          onPress={() => navigation.navigate("MessagesStack")}
          type="clear"
          icon={<Image source={Send} style={styles.addButton} />}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    minHeight: 60,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerContainer: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    right: -4,
  },
  addButton: {
    width: 22,
    height: 22,
  },
  text: {
    fontFamily: "Instagram",
    fontSize: 28,
  },
});

//make this component available to the app
export default Header;
