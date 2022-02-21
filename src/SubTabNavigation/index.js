//import liraries
import React, { useReducer, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CameraScreen from "./cameraScreen";
import MessageTabNavigation from "../messageTabNavigation";
import HomeTabNav from "../TabNavigation";
import { reducer, SwipeContext } from "../components/swipeContext/swipeReducer";

import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const HomeTab = () => {
  const swipeState = useContext(SwipeContext);

  return (
    <Navigator
      backBehavior="history"
      initialRouteName="HomeTabNav"
      screenOptions={{
        headerShown: false,
        swipeEnabled: swipeState.swipeEnabled,
      }}
      tabBar={() => <View style={{ display: "none" }} />}>
      <Screen name="Camera" component={CameraScreen} />
      <Screen name="HomeTabNav" component={HomeTabNav} />
      <Screen name="MessagesStack" component={MessageTabNavigation} />
    </Navigator>
  );
};

// create a component
const HomeStack = () => {
  const [swipeEnabled, setSwipeEnabled] = useReducer(reducer, false);

  return (
    <SwipeContext.Provider
      value={{
        swipeEnabled: swipeEnabled,
        // setTabColor: setTabColor,
        setSwipeEnabled: setSwipeEnabled,
        // tabColor: tabColor,
      }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTab" component={HomeTab} />
      </Stack.Navigator>
    </SwipeContext.Provider>
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
export default HomeStack;
