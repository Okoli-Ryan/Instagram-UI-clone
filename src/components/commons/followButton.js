//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

// create a component
const FollowButton = ({ textActive = "Following", textPassive = "Follow" }) => {
  const [following, setFollowing] = useState(false);

  return (
    <>
      {following ? (
        <TouchableWithoutFeedback onPress={() => setFollowing((prev) => !prev)}>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 16,
              backgroundColor: "transparent",
              borderColor: "#aaa",
              borderRadius: 4,
              borderWidth: 0.5,
            }}>
            <Text
              style={{
                color: "#000",
                fontSize: 14,
                fontFamily: "Hel_Light",
              }}>
              {textActive}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={() => setFollowing((prev) => !prev)}>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 16,
              backgroundColor: "#4596ff",
              borderRadius: 4,
            }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontFamily: "Hel_Light",
              }}>
              {textPassive}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
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
export default FollowButton;
