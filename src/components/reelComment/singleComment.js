//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Man from "../../assets/icons/man.png";

// create a component
const SingleComment = () => {
  const [liked, setLiked] = useState(false);

  const onLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 12,
      }}>
      <View style={{ width: "10%", paddingHorizontal: 16 }}>
        <Image
          source={Man}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>
      <View
        style={{
          width: "75%",
          paddingLeft: 16,
          alignSelf: "flex-end",
        }}>
        <Text style={{ fontSize: 14, fontFamily: "Hel", lineHeight: 18 }}>
          damviviian{" "}
          <Text style={{ fontSize: 14, fontFamily: "Hel_Light" }}>
            Best thing i've seen in a long time
          </Text>
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 4,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: "#888",
              fontFamily: "Hel_Light",
            }}>
            2h
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginLeft: 16,
              color: "#888",
              fontFamily: "Hel_Light",
            }}>
            35 likes
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginLeft: 16,
              color: "#888",
              fontFamily: "Hel_Light",
            }}>
            Reply
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 16,
          }}>
          <View
            style={{
              height: 1,
              backgroundColor: "#ccc",
              width: 32,
            }}></View>
          <View style={{ marginLeft: 8, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 12,
                color: "#888",
                fontFamily: "Hel_Light",
              }}>
              View 5 previous replies
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={onLike}
        style={{ width: "10%", alignItems: "center", paddingTop: 16 }}>
        <MCIcon
          style={{ marginRight: 4 }}
          name={liked ? "heart" : "heart-outline"}
          size={14}
          color={liked ? "red" : "#888"}></MCIcon>
      </TouchableOpacity>
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
export default SingleComment;
