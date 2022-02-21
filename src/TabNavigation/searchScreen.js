//import liraries
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  Animated,
} from "react-native";
import { CardSection } from "../components/searchCards";
import Glass from "../assets/icons/glass_outline.png";

const getCloser = (value, checkOne, checkTwo) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

// create a component
const SearchScreen = () => {
  const MAX_TOP = 60;
  const ref = useRef(null);
  const translateYNumber = useRef(0);

  const top = useRef(new Animated.Value(0)).current;
  const clamp = Animated.diffClamp(top, 0, MAX_TOP);
  const animateTop = clamp.interpolate({
    inputRange: [0, MAX_TOP],
    outputRange: [0, -MAX_TOP],
    extrapolate: "clamp",
  });

  animateTop.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleSnap = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -MAX_TOP / 2
      )
    ) {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -MAX_TOP / 2, 0) ===
            -MAX_TOP / 2
              ? offsetY + MAX_TOP / 2
              : offsetY - MAX_TOP / 2,
        });
      }
    }
  };

  const data = [];
  for (let i = 0; i < 3; i++) {
    data.push(i);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <View style={styles.container}>
        <Animated.FlatList
          data={data}
          ref={ref}
          onMomentumScrollEnd={handleSnap}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: top } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => <CardSection index={index} />}
          keyExtractor={(i) => i.toString()}
          ListHeaderComponent={() => (
            <Animated.View
              style={[
                {
                  width: "100%",
                  padding: 8,
                  height: 50,
                  position: "relative",
                  paddingHorizontal: 12,
                  backgroundColor: "white",
                  transform: [
                    {
                      translateY: animateTop,
                    },
                  ],
                },
              ]}>
              <Animated.Image
                source={Glass}
                style={{
                  width: 18,
                  height: 18,
                  position: "absolute",
                  left: 24,
                  top: 16,
                  zIndex: 2,
                }}
              />
              <TextInput
                placeholder="Search"
                style={{
                  backgroundColor: "#eee",
                  paddingVertical: 4,
                  fontFamily: "Hel",
                  paddingLeft: 40,
                  fontSize: 14,
                  borderRadius: 8,
                }}
              />
            </Animated.View>
          )}
          stickyHeaderIndices={[0]}
        />
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
});

//make this component available to the app
export default SearchScreen;
