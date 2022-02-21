//import liraries
import React, { useState, useContext, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Easing,
  TouchableHighlight,
  BackHandler,
  Pressable,
} from "react-native";
import AntD from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import SLIcons from "react-native-vector-icons/SimpleLineIcons";
import CallsScreen from "./CallsScreen";
import MessagesScreen from "./messagesScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { SwipeContext } from "../components/swipeContext/swipeReducer";
import MessageRequestScreen from "./MessageRequestsScreen";

const { width } = Dimensions.get("window");

const Header = ({ navigation }) => {
  return (
    <View
      style={[
        styles.horizontal,
        {
          paddingHorizontal: 16,
          paddingVertical: 16,
          paddingBottom: 12,
          backgroundColor: "#fff",
        },
      ]}>
      <View style={styles.horizontal}>
        <AntD
          size={24}
          name="arrowleft"
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontFamily: "Lobster",
            fontSize: 22,
            color: "#000",
            marginLeft: 24,
            marginRight: 8,
          }}>
          okoli_ryan
        </Text>
        <SLIcons size={10} name="arrow-down" color="#000" />
      </View>
      <View style={[styles.horizontal, { marginLeft: "auto" }]}>
        <AntD
          size={24}
          name="videocamera"
          color="#000"
          style={{ marginRight: 32 }}
        />
        <Feather size={24} name="edit" color="#000" />
      </View>
    </View>
  );
};

const TabHeader = ({ setTabIndex, tabIndex, navigation }) => {
  const borderAnim = useRef(new Animated.Value(0)).current;

  const changeRoute = () => {
    Animated.timing(borderAnim, {
      toValue: 1 - tabIndex,
      easing: Easing.ease,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const borderX = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width / 3],
    extrapolate: "clamp",
  });

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Header navigation={navigation} />
      <View
        style={[
          styles.horizontal,
          {
            borderBottomColor: "#888",
            borderBottomWidth: 0.5,
            position: "relative",
          },
        ]}>
        <Pressable
          onPress={() => {
            if (tabIndex !== 0) {
              setTabIndex(0);
              changeRoute();
            }
          }}
          android_ripple={{ color: "#888" }}
          style={{
            width: width / 3,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 16,
          }}>
          <Text style={{ fontFamily: "Hel_Light", color: "#444" }}>Chats</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (tabIndex !== 1) {
              setTabIndex(1);
              changeRoute();
            }
          }}
          android_ripple={{ color: "#888" }}
          style={{
            width: width / 3,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 16,
          }}>
          <Text style={{ fontFamily: "Hel_Light", color: "#444" }}>Calls</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("MessageRequest");
            setTabIndex(0);
          }}
          style={{
            width: width / 3,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 16,
          }}>
          <Text style={{ fontFamily: "Hel_Light", color: "#444" }}>
            Requests
          </Text>
        </Pressable>
        <Animated.View
          style={{
            width: width / 3,
            height: 0.5,
            backgroundColor: "#000",
            bottom: 0,
            position: "absolute",
            transform: [
              {
                translateX: borderX,
              },
            ],
          }}
        />
      </View>
    </View>
  );
};

// create a component
const MessagesContainer = ({ navigation }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const swipeDispatch = useContext(SwipeContext);

  useFocusEffect(
    useCallback(() => {
      swipeDispatch.setSwipeEnabled("on");

      return () => swipeDispatch.setSwipeEnabled("off");
    }, [navigation])
  );

  const { Navigator, Screen } = createStackNavigator();

  const CurrentTab = () => {
    return <>{tabIndex === 0 ? <MessagesScreen /> : <CallsScreen />}</>;
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <Navigator
        backBehaviour="history"
        screenOptions={{
          header: ({ route, navigation }) => {
            return (
              <TabHeader
                setTabIndex={setTabIndex}
                tabIndex={tabIndex}
                navigation={navigation}
              />
            );
          },
        }}>
        <Screen name="ChatsCalls" component={CurrentTab} />
        <Screen
          options={{ headerShown: false }}
          name="MessageRequest"
          component={MessageRequestScreen}
        />
      </Navigator>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  horizontal: {
    alignItems: "center",
    flexDirection: "row",
  },
});

//make this component available to the app
export default MessagesContainer;
