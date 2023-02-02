//import liraries
import React, { useRef, useState, useCallback, useContext } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  StatusBar,
  KeyboardAvoidingView,
  PanResponder,
  SafeAreaView,
  Animated,
} from "react-native";
import Reel from "../components/reel";
import { generateColor } from "../components/searchCards";
import Icon from "react-native-vector-icons/Feather";
import ReelComment from "../components/reelComment";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SendModal from "../components/sendModal/sendModal";
// import { useFocusEffect } from "@react-navigation/native";
// import { SwipeContext } from "../components/swipeContext/swipeReducer";

// create a component

const ReelsScreen = ({ navigation }) => {
  const [viewed, setViewed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(["yellow", "thistle", "skyblue", "teal"]);
  const reelsAnim = useRef(new Animated.Value(0)).current;
  const heightInit = Dimensions.get("window").height;
  const tabBarHeight = useBottomTabBarHeight();
  const height = heightInit - tabBarHeight / 2;

  //state for the comment modal
  const [hideComments, setHideComments] = useState(true);
  const commentsAnim = useRef(new Animated.Value(1)).current;
  const dragAnim = useRef(new Animated.Value(height)).current;

  //state for the send modal
  const [hideSend, setHideSend] = useState(true);
  const slideSendAnim = useRef(new Animated.Value(height)).current;
  // const { setTabColor } = useContext(SwipeContext);

  // useFocusEffect(
  //   useCallback(() => {
  //     setTabColor("on");

  //     return () => setTabColor("off");
  //   }, [navigation])
  // );

  const slideSend = () => {
    Animated.timing(slideSendAnim, {
      toValue: hideSend ? height : 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setHideSend((prev) => !prev));
  };

  const showComments = () => {
    Animated.parallel([
      Animated.timing(commentsAnim, {
        toValue: !hideComments ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(reelsAnim, {
        toValue: hideComments ? (2 * height) / 3 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(dragAnim, {
        toValue: !hideComments ? height : 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setHideComments((prev) => !prev));
  };

  const _panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e, { dy, vy }) => {
        dragAnim.setValue(dy);
        reelsAnim.setValue((height * 2) / 3 - dy);
        commentsAnim.setValue((dy * 1.2) / height);
      },
      onPanResponderRelease: (e, { vy, dy }) => {
        if (Math.abs(vy) >= 0.5 || dy >= 0.5 * height) {
          Animated.parallel([
            Animated.timing(dragAnim, {
              toValue: dy > 0 ? height : 0,
              duration: 500,
              useNativeDriver: true,
            }),

            Animated.timing(commentsAnim, {
              toValue: dy > 0 ? 1 : 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.spring(reelsAnim, {
              toValue: dy > 0 ? 0 : height,
              bounciness: 10,
              duration: 500,
              useNativeDriver: false,
            }),
          ]).start(() => setHideComments(true));
        } else {
          Animated.parallel([
            Animated.spring(dragAnim, {
              toValue: 0,
              bounciness: 10,
              useNativeDriver: true,
            }),
            Animated.spring(commentsAnim, {
              toValue: 0,
              bounciness: 10,
              useNativeDriver: true,
            }),
            Animated.spring(reelsAnim, {
              toValue: (height * 2) / 3,
              bounciness: 10,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    })
  ).current;

  const updateData = async () => {
    setLoading(true);
    let colors = [];
    for (let i = 0; i < 4; i++) {
      colors.push(generateColor());
    }

    await new Promise((resolve) =>
      setTimeout(() => {
        setData((prev) => [...prev, ...colors]);
        setLoading(false);
        resolve();
      }, 2000)
    );
  };

  const viewConfigRef = React.useRef({ itemVisiblePercentThreshold: 98 });

  const viewableItemChange = React.useCallback(({ changed }) => {
    if (data.length - changed[0].index < 3) {
      let colors = [];
      for (let i = 0; i < 4; i++) {
        colors.push(generateColor());
      }
      setData((prev) => [...prev, ...colors]);
    }
    setViewed(changed[0].index);
  }, []);

  const translateY = useRef(new Animated.Value(0)).current;

  const clamp = Animated.diffClamp(translateY, 0, 50);

  const animateTop = clamp.interpolate({
    inputRange: [0, 10],
    outputRange: [1, -50],
    extrapolate: "clamp",
  });

  const translateVideoY = commentsAnim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [-heightInit, heightInit / 8, 0],
  });

  const scaleVideo = commentsAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3333, 0.8, 1],
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        position: "relative",
      }}>
      <StatusBar backgroundColor="black"></StatusBar>

      <SendModal
        slideSendAnim={slideSendAnim}
        slideSend={slideSend}
        setHideSend={setHideSend}
        hideSend={hideSend}
      />
      <View style={[styles.container]}>
        <Animated.View
          style={{
            width: "100%",
            height: height / 3,
            zIndex: 100,
            position: "absolute",
            transform: [
              {
                translateY: dragAnim,
              },
            ],
          }}
          {..._panResponder.panHandlers}></Animated.View>

        <Animated.FlatList
          style={{
            flex: 1,
            width: "100%",
          }}
          ListHeaderComponent={() => (
            <>
              <Animated.View
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  opacity: commentsAnim,
                }}>
                <Icon
                  name="camera"
                  size={28}
                  color="white"
                  style={{ padding: 8 }}
                />
              </Animated.View>
              <Animated.View
                style={{
                  transform: [{ translateY: animateTop }],
                  position: "relative",
                  opacity: commentsAnim,
                }}>
                <View style={{ height: 0.5 }}></View>

                <Animated.Text
                  style={{
                    left: 16,
                    top: 16,
                    // top: translateY,
                    fontFamily: "Hel",
                    position: "absolute",
                    color: "white",
                    fontSize: 24,
                    zIndex: 99,
                  }}>
                  Reels
                </Animated.Text>
              </Animated.View>
            </>
          )}
          data={data}
          snapToEnd
          scrollEnabled={hideComments}
          viewabilityConfig={viewConfigRef.current}
          pagingEnabled
          onViewableItemsChanged={viewableItemChange}
          onRefresh={updateData}
          refreshing={loading && hideComments}
          showsVerticalScrollIndicator={false}
          extraData={data}
          keyExtractor={(item) => item}
          stickyHeaderIndices={[0]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: translateY } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => (
            <>
              <Animated.View
                style={[
                  styles.videoContainer,
                  {
                    height: height,
                    transform: [
                      { scale: scaleVideo },
                      // { scaleY: 0.3333 },
                      { translateY: translateVideoY },
                    ],
                  },
                ]}>
                <Reel
                  slideSend={slideSend}
                  play={index === viewed}
                  showComments={showComments}
                />
              </Animated.View>
            </>
          )}
          scrollEventThrottle={16}
        />
      </View>
      <Animated.View
        style={{
          height: reelsAnim,
        }}>
        <ReelComment />
      </Animated.View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "black",
  },
  child: {
    justifyContent: "center",
  },
  videoContainer: {
    width: "100%",
    flex: 1,
  },
  sendContainer: {
    bottom: 0,
    zIndex: 100,
    position: "absolute",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

//make this component available to the app
export default ReelsScreen;
