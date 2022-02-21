//import liraries
import React, { useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import Header from "../components/header";
import PostCard from "../components/postCard";
import { useFocusEffect } from "@react-navigation/native";
import { SwipeContext } from "../components/swipeContext/swipeReducer";
import Hacker from "../assets/icons/hacker.png";
import IIcons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

// create a component

const Stories = () => {
  return (
    <>
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        listKey="0"
        contentContainerStyle={{
          paddingVertical: 16,
          borderBottomColor: "#888",
          borderBottomWidth: 0.5,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={() => (
          <View
            style={{
              marginHorizontal: 12,
            }}>
            <LinearGradient
              // Background Linear Gradient
              colors={["#DD2A7B", "#FEDA77"]}
              start={{ x: 0.8, y: 0 }}
              style={{
                padding: 2,
                justifyContent: "center",
                borderRadius: 200,
                alignItems: "center",
              }}>
              <Image
                source={Hacker}
                style={{
                  width: 54,
                  backgroundColor: "#fff",
                  height: 54,
                  borderRadius: 27,
                  borderWidth: 3,
                  borderColor: "#fff",
                }}
              />
            </LinearGradient>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={{ position: "relative", marginHorizontal: 12 }}>
            <IIcons
              name="add-circle"
              size={20}
              color="#4596ff"
              style={{
                zIndex: 2,
                bottom: -4,
                right: -4,
                position: "absolute",
                backgroundColor: "#fff",
                borderRadius: 99,
              }}
            />
            <Image
              source={Hacker}
              style={{ width: 54, height: 54, borderRadius: 27 }}
            />
          </View>
        )}
        keyExtractor={(item) => item.toString()}
      />
      <View
        style={{ height: 0.5, backgroundColor: "#888", width: "100%" }}></View>
    </>
  );
};

const Home = ({ navigation }) => {
  const swipeDispatch = useContext(SwipeContext);

  useFocusEffect(
    useCallback(() => {
      swipeDispatch.setSwipeEnabled("on");

      return () => swipeDispatch.setSwipeEnabled("off");
    }, [navigation])
  );
  return (
    <>
      <View style={styles.container}>
        <StatusBar />
        <Header navigation={navigation} />
        <FlatList
          data={[0, 1, 2, 3, 4, 5, 6, 7]}
          renderItem={() => <PostCard />}
          keyExtractor={(item) => item.toString()}
          listKey="1"
          ListHeaderComponent={Stories}
        />
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
});

//make this component available to the app
export default Home;
