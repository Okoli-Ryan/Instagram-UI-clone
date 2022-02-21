//import liraries
import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import IIcons from "react-native-vector-icons/Ionicons";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntD from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

const height = Dimensions.get("window").height;

// create a component
const MessageRequestScreen = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.horizontal,
          { paddingVertical: 16, paddingBottom: 8, paddingHorizontal: 16 },
        ]}>
        <AntD
          size={24}
          name="arrowleft"
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontFamily: "Hel",
            fontSize: 18,
            color: "#000",
            marginLeft: 24,
            marginRight: 8,
          }}>
          Messages Request
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 0.5,
          borderBottomColor: "#ccc",
          backgroundColor: "#eee",
          alignItems: "center",
        }}>
        <Text
          style={{
            fontFamily: "Hel_Light",
            textAlign: "center",
            color: "#888",
            fontSize: 12,
          }}>
          Open a chat to get more info about who's messaging you. They won't
          know yo've seen it until you accept.
        </Text>
      </View>
      <TouchableOpacity style={[styles.horizontal, { padding: 16 }]}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            borderWidth: 0.5,
            borderColor: "#888",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <IIcons name="eye-off-outline" size={24} color="#888" />
        </View>
        <Text
          style={{ fontFamily: "Hel_Light", color: "#444", marginLeft: 16 }}>
          Hidden Requests
        </Text>
        <View style={[styles.horizontal, { marginLeft: "auto" }]}>
          <Text
            style={{
              fontFamily: "Hel_Light",
              color: "#888",
              marginRight: 8,
              fontSize: 12,
            }}>
            0
          </Text>
          <MCIcons name="chevron-right" size={24} color="#888" />
        </View>
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          zIndex: 0,
          transform: [{ translateY: height / 2.5 }],
          //   top: "-25%",
          width: "100%",
        }}>
        <View
          style={{
            width: 84,
            height: 84,
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 42,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Feather size={42} color="#000" name="send" />
        </View>
        <Text
          style={{
            marginVertical: 12,
            fontSize: 24,
            fontFamily: "Lobster",
            color: "#000",
          }}>
          No message requests
        </Text>
        <Text
          style={{
            color: "#888",
            fontFamily: "Hel_Light",
            textAlign: "center",
            // fontSize: 12,
          }}>
          You don't have any message requests
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
});

//make this component available to the app
export default MessageRequestScreen;
