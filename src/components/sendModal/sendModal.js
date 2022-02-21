//import liraries
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Animated,
  Dimensions,
  PanResponder,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import Gamer from "../../assets/icons/gamer.png";
import Flame from "../../assets/icons/flame.png";
import InLove from "../../assets/icons/heart-eyes.png";
import Cry from "../../assets/icons/crying.png";
import Laugh from "../../assets/icons/laughing.png";
import Heart from "../../assets/icons/red-heart.png";
import Hands from "../../assets/icons/hands.png";
import Shocked from "../../assets/icons/shocked.png";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntD from "react-native-vector-icons/AntDesign";
import SendRenderItem from "./sendRenderItem";

const data = [
  "#aa33ee",
  "black",
  "red",
  "tomato",
  "yellow",
  "#e3b00a",
  "#cffc00",
  "green",
  "blue",
  "#023578",
  "white",
  "#afbe3e",
];

const { height } = Dimensions.get("window");

const SendModal = ({ hideSend, setHideSend, slideSendAnim, slideSend }) => {
  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            position: "absolute",
            height: height,
            transform: [{ translateY: slideSendAnim }],
          },
        ]}>
        <TouchableWithoutFeedback onPress={slideSend}>
          <Animated.View
            style={{
              height: height / 5,
              width: "100%",
              backgroundColor: "transparent",
              zIndex: 900,
              top: 0,
              position: "absolute",
              transform: [{ translateY: slideSendAnim }],
            }}></Animated.View>
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView
          behavior="height"
          style={{ flex: 1, top: height / 5 }}>
          <View
            style={{
              height: (height * 4) / 5,
              width: "100%",

              backgroundColor: "#fff",
              alignItems: "center",
            }}>
            <View
              style={{
                width: 40,
                height: 4,
                marginTop: 12,
                backgroundColor: "#aaa",
                marginVertical: 4,
              }}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: 8,
                padding: 16,
                paddingTop: 8,
                paddingBottom: 0,
                width: "100%",
              }}>
              <Image
                source={Gamer}
                style={{ width: 36, height: 36, borderRadius: 18 }}
              />
              <TextInput
                style={{
                  fontFamily: "Hel_Light",
                  color: "#888",
                  flex: 1,
                  padding: 8,
                  paddingLeft: 16,
                }}
                placeholder="Write a message..."
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingVertical: 8,
                width: "100%",
                alignItems: "center",
                borderBottomWidth: 0.4,
                marginBottom: 16,
                borderColor: "#ddd",
              }}>
              <Image source={Flame} style={styles.icon} />
              <Image source={InLove} style={styles.icon} />
              <Image source={Cry} style={styles.icon} />
              <Image source={Laugh} style={styles.icon} />
              <Image source={Heart} style={styles.icon} />
              <Image source={Shocked} style={styles.icon} />
              <Image source={Hands} style={styles.icon} />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}>
              <View
                style={{
                  position: "relative",
                  width: "100%",
                  marginBottom: 4,
                  justifyContent: "flex-end",
                }}>
                <MCIcon
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
                <AntD
                  name="addusergroup"
                  color="#aaa"
                  size={18}
                  style={{ position: "absolute", top: 10, right: 24 }}
                />
              </View>
            </View>

            <FlatList
              style={{ width: "100%" }}
              data={data}
              keyExtractor={(item) => item}
              ListHeaderComponent={() => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 16,
                      paddingRight: 8,
                      paddingVertical: 8,
                    }}>
                    <Image
                      source={Gamer}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: "#4596ff",
                      fontFamily: "Hel_Light",
                      fontSize: 14,
                      marginLeft: 7,
                    }}>
                    Add reel to your story
                  </Text>
                </View>
              )}
              renderItem={({ item }) => <SendRenderItem />}
            />
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    position: "absolute",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  icon: {
    // Horizontal: 8,
    width: 24,
    height: 24,
  },
});

//make this component available to the app
export default SendModal;
