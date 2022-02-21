//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { generateColor } from "../components/searchCards";
import AntD from "react-native-vector-icons/AntDesign";
import IIcons from "react-native-vector-icons/Ionicons";
import Hacker from "../assets/icons/hacker.png";

// create a component
const CallsScreen = () => {
  return (
    <ScrollView nestedScrollEnabled style={styles.container}>
      <StatusBar></StatusBar>
      <View
        style={{
          paddingVertical: 8,
          borderBottomColor: "#888",
          borderBottomWidth: 0.5,
          backgroundColor: "#fff",
        }}>
        <TouchableOpacity
          style={[styles.horizontal, { padding: 16, backgroundColor: "#fff" }]}>
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
            <IIcons name="call-outline" size={24} color="#888" />
          </View>
          <View style={{ marginLeft: 16 }}>
            <Text style={{ fontFamily: "Hel_Light", color: "#444" }}>
              Video
            </Text>
            <Text style={{ color: "#aaa", fontFamily: "Hel_Light" }}>
              Hang out on video
            </Text>
          </View>
          <MCIcons
            name="chevron-right"
            size={24}
            color="#888"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
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
            <MCIcons name="video-plus-outline" size={24} color="#888" />
          </View>
          <View style={{ marginLeft: 16 }}>
            <Text style={{ fontFamily: "Hel_Light", color: "#444" }}>
              Audio
            </Text>
            <Text style={{ color: "#aaa", fontFamily: "Hel_Light" }}>
              Start with audio
            </Text>
          </View>
          <MCIcons
            name="chevron-right"
            size={24}
            color="#888"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingBottom: 16,
          borderBottomColor: "#888",
          borderBottomWidth: 0.5,
        }}>
        <Text
          style={{
            paddingVertical: 24,
            paddingHorizontal: 16,
            fontSize: 16,
            fontFamily: "Hel_Light",
          }}>
          Watch Together
        </Text>
        <FlatList
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          contentContainerStyle={{
            paddingHorizontal: 6,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={() => (
            <View
              style={{
                width: 120,
                borderRadius: 10,
                height: 180,
                backgroundColor: generateColor(),
                marginRight: 6,
              }}></View>
          )}
        />
      </View>
      <View>
        <FlatList
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          keyExtractor={(item) => item.toString()}
          ListHeaderComponent={() => (
            <>
              <Text
                style={{
                  paddingVertical: 24,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  fontFamily: "Hel_Light",
                }}>
                Call Friends
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  justifyContent: "flex-start",
                  paddingVertical: 16,
                }}>
                <View
                  style={{
                    position: "relative",
                    width: "100%",
                    marginBottom: 4,
                    justifyContent: "flex-end",
                  }}>
                  <MCIcons
                    name="magnify"
                    color="#aaa"
                    size={18}
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 24,
                      zIndex: 2,
                    }}
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
                </View>
              </View>
            </>
          )}
          renderItem={() => (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginVertical: 8,
              }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ paddingHorizontal: 16 }}>
                  <Image
                    source={Hacker}
                    style={{ width: 42, height: 42, borderRadius: 21 }}
                  />
                </View>
                <View>
                  <Text
                    style={{ fontFamily: "Hel", fontSize: 14, color: "#111" }}>
                    Alex Seeks
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Hel_Light",
                      fontSize: 12,
                      color: "#666",
                      marginTop: 2,
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
                  paddingHorizontal: 16,
                  alignItems: "center",
                }}>
                <IIcons
                  name="call-outline"
                  size={24}
                  color="#000"
                  style={{ marginRight: 16 }}
                />
                <AntD name="videocamera" size={24} color="#000" />
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
  },
});

//make this component available to the app
export default CallsScreen;
