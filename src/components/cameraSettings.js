//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  Modal,
  Switch,
  TouchableOpacity,
} from "react-native";
import MIcons from "react-native-vector-icons/MaterialIcons";
import OIcons from "react-native-vector-icons/Octicons";

// create a component
const CameraSettings = ({ visible, setVisible }) => {
  const [frontCamera, setFrontCamera] = useState(false);
  const [cameraLeft, setCameraLeft] = useState(true);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={() => {}}>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: 24,
          borderBottomColor: "#888",
          borderBottomWidth: 0.5,
        }}>
        <Text style={{ fontFamily: "Lobster", fontSize: 28, color: "#000" }}>
          Camera Settings
        </Text>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text
            style={{
              fontFamily: "Hel_Light",
              color: "#4596ff",
              fontSize: 20,
            }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingTop: 8,
          paddingBottom: 16,
          paddingHorizontal: 16,
          borderBottomColor: "#888",
          borderBottomWidth: 0.5,
        }}>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <MIcons
            name="add-circle-outline"
            size={24}
            color="#000"
            style={{ marginRight: 12 }}
          />
          <Text
            style={{ fontFamily: "Hel_Light", color: "#000", fontSize: 16 }}>
            Story
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <MIcons
            name="videocam"
            size={24}
            color="#000"
            style={{ marginRight: 12 }}
          />
          <Text
            style={{ fontFamily: "Hel_Light", color: "#000", fontSize: 16 }}>
            Reels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <OIcons
            name="broadcast"
            size={24}
            color="#000"
            style={{ marginRight: 12 }}
          />
          <Text
            style={{ fontFamily: "Hel_Light", color: "#000", fontSize: 16 }}>
            Live
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 16 }}>
        <Text
          style={{
            fontFamily: "Hel_Light",
            color: "#666",
            paddingHorizontal: 16,
            fontSize: 16,
          }}>
          Controls
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            paddingHorizontal: 16,
          }}>
          <Text
            style={{ fontFamily: "Hel_Light", color: "#000", fontSize: 16 }}>
            Always Start on Front Camera
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#75b1ff" }}
            thumbColor={frontCamera ? "#4596ff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setFrontCamera((prev) => !prev)}
            value={frontCamera}
          />
        </View>
        <Text
          style={{
            fontFamily: "Hel_Light",
            color: "#666",
            fontSize: 16,
            paddingHorizontal: 16,
          }}>
          Camera Tools
        </Text>
        <Text
          style={{
            fontFamily: "Hel_Light",
            color: "#888",
            fontSize: 12,
            marginTop: 8,
            marginBottom: 16,
            paddingHorizontal: 16,
          }}>
          Choose which side of the screen you want your camera toolbar to be on
        </Text>
        <TouchableOpacity
          onPress={() => setCameraLeft((prev) => !prev)}
          style={{
            flexDirection: "row",
            paddingVertical: 8,
            alignItems: "center",

            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}>
          <Text
            style={{ fontSize: 16, fontFamily: "Hel_Light", color: "#000" }}>
            Left Side
          </Text>
          <MIcons
            size={28}
            color={cameraLeft ? "#4596ff" : "#888"}
            name={cameraLeft ? "check-circle" : "radio-button-unchecked"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCameraLeft((prev) => !prev)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <Text
            style={{ fontSize: 16, fontFamily: "Hel_Light", color: "#000" }}>
            Right Side
          </Text>
          <MIcons
            size={28}
            color={!cameraLeft ? "#4596ff" : "#888"}
            name={!cameraLeft ? "check-circle" : "radio-button-unchecked"}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default CameraSettings;
