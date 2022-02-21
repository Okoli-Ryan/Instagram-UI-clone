import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import HomeScreen from "../SubTabNavigation/homeScreen";
import ActivityScreen from "./activityScreen";
import ProfileScreen from "./profileScreen";
import ReelsScreen from "./reelsScreen";
import SearchScreen from "./searchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntD from "react-native-vector-icons/AntDesign";
import Hacker from "../../src/assets/icons/hacker.png";
// import { SwipeContext } from "../components/swipeContext/swipeReducer";

const { Navigator, Screen } = createBottomTabNavigator();

const TabNav = () => {
  //   const { tabColor } = useContext(SwipeContext);
  return (
    <Navigator
      backBehavior="history"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let color = focused ? "#000" : "#444";

          if (route.name === "Home") {
            return focused ? (
              <MCIcons name="home" size={28} color={color} />
            ) : (
              <MCIcons name="home-outline" size={28} color={color} />
            );
          } else if (route.name === "Search") {
            return focused ? (
              <Ionicons name="search" size={28} color={color} />
            ) : (
              <Ionicons name="search-outline" size={28} color={color} />
            );
          } else if (route.name === "Reels") {
            return focused ? (
              <Ionicons name="ios-film" size={28} color={color} />
            ) : (
              <Ionicons name="ios-film-outline" size={28} color={color} />
            );
          } else if (route.name === "Activity") {
            return focused ? (
              <AntD name="heart" size={28} color={color} />
            ) : (
              <AntD name="hearto" size={28} color={color} />
            );
          } else if (route.name === "Profile") {
            return focused ? (
              <Image
                source={Hacker}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#000",
                }}
              />
            ) : (
              <Image
                source={Hacker}
                style={{ width: 32, height: 32, borderRadius: 16 }}
              />
            );
          }
        },
        // tabBarStyle: tabColor
        //   ? { backgroundColor: "red" }
        //   : { backgroundColor: "#fff" },
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Search" component={SearchScreen} />
      <Screen name="Reels" component={ReelsScreen} />
      <Screen name="Activity" component={ActivityScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
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
export default TabNav;
