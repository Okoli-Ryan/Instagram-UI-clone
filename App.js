import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeTabNavigation from "./src/SubTabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { Login, Logout } from "./oowlish";
export default function App() {
	const [auth, setAuth] = useState(false);

	function toggleAuth() {
		setAuth((prev) => !prev);
	}

	return (
		<SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
			<NavigationContainer>
				<HomeTabNavigation />
			</NavigationContainer>
		</SafeAreaView>
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
