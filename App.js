import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeTabNavigation from "./src/SubTabNavigation";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {

  
  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
      <NavigationContainer>
        <HomeTabNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
