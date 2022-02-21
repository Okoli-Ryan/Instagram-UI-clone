import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  View,
  Image,
  FlatList,
  PanResponder,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { RNCamera } from "react-native-camera";
import Ionicons from "react-native-vector-icons/Ionicons";
import MIcons from "react-native-vector-icons/MaterialIcons";
import { generateColor } from "../components/searchCards";
import Hacker from "../assets/icons/hacker.png";
import * as Progress from "react-native-progress";
import SettingsModal from "../components/cameraSettings";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { SwipeContext } from "../components/swipeContext/swipeReducer";

const { width } = Dimensions.get("window");
const itemWidth = width / 5;
const padding = (width - itemWidth) / 2;
const offset = itemWidth;

const FlashIcon = ({ flashState, style, onPress }) => {
  const getState = () => {
    if (flashState === 0) return "flash-auto";
    if (flashState === 1) return "flash-on";
    if (flashState === 2) return "flash-off";
  };
  return (
    <MIcons
      color="#fff"
      onPress={onPress}
      size={28}
      style={style}
      name={getState()}
    />
  );
};

const MediaOption = ({ i, scrollX2, text }) => {
  const opacity = scrollX2.interpolate({
    inputRange: [
      -offset + i * offset * 2,
      i * offset * 2,
      offset + i * offset * 2,
    ],
    outputRange: [0.5, 1, 0.5],
  });
  return (
    <View style={{ width: itemWidth * 2 }}>
      <Animated.Text
        style={[
          {
            fontFamily: "Hel",
            color: "#fff",
            marginLeft: -itemWidth / 2,
            opacity: opacity,
          },
        ]}>
        {text}
      </Animated.Text>
    </View>
  );
};

const CameraOption = ({
  i,
  scrollX,
  isCounting,
  selectedCameraOption,
  setIsCounting,
  setVideoProgress,
}) => {
  const scale = scrollX.interpolate({
    inputRange: [
      -offset + 28 + i * offset,
      i * offset,
      offset - 28 + i * offset,
    ],
    outputRange: [0.75, 1, 0.75],
  });

  const record = () => {
    if (!isCounting && i === selectedCameraOption) {
      setIsCounting(true);
      return;
    }
    if (isCounting) {
      setIsCounting(false);
    }
  };

  const startRecord = () => {
    if (i === selectedCameraOption) {
      setIsCounting(true);
    }
  };

  const stopRecord = () => {
    setIsCounting(false);
    setVideoProgress(0);
  };

  return (
    <>
      {(!isCounting || (isCounting && i === selectedCameraOption)) && (
        <Pressable onPressOut={stopRecord} onLongPress={startRecord}>
          <Animated.View
            style={[
              {
                height: itemWidth,
                width: itemWidth,
                zIndex: 2,
                borderRadius: itemWidth / 2,
                backgroundColor: generateColor(),
                transform: [{ scale }],
              },
            ]}
          />
        </Pressable>
      )}
    </>
  );
};

export default function App({ navigation }) {
  const [flashState, setFlashState] = useState(0);
  const [type, setType] = useState(RNCamera.Constants.Type.front);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollX2 = useRef(new Animated.Value(0)).current;
  const timer = useRef(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [selectedCameraOption, setSelectedCameraOption] = useState(0);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const isFocused = useIsFocused();
  const swipeDispatch = useContext(SwipeContext);

  useFocusEffect(
    useCallback(() => {
      swipeDispatch.setSwipeEnabled("on");

      return () => swipeDispatch.setSwipeEnabled("off");
    }, [navigation])
  );

  useEffect(() => {
    if (isCounting && videoProgress <= 1) {
      timer.current = setTimeout(() => {
        setVideoProgress((prev) => prev + 1 / 30);
      }, 1000);
    } else clearTimeout(timer.current);

    return () => clearTimeout(timer.current);
  }, [isCounting, videoProgress]);

  const changeFlashState = () => {
    setFlashState((prev) => (prev + 1) % 3);
  };

  return (
    <>
      <SettingsModal
        visible={settingsVisible}
        setVisible={setSettingsVisible}
      />
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        {isFocused && (
          <RNCamera
            ratio="16:9"
            style={{ flex: 1, justifyContent: "space-between" }}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            type={type}>
            <View
              style={{
                paddingTop: 16,
                paddingHorizontal: 16,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Ionicons
                onPress={() => setSettingsVisible(true)}
                color="#fff"
                size={28}
                name="ios-settings-sharp"
                style={{ padding: 8 }}
              />
              <FlashIcon
                onPress={changeFlashState}
                flashState={flashState}
                style={{ padding: 8 }}
              />
              <MIcons
                onPress={() => navigation.navigate("HomeTabNav")}
                color="#fff"
                size={28}
                name="close"
                style={{ padding: 8 }}
              />
            </View>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  width: width,
                  top: 8,
                  left: 0,
                  justifyContent: "center",
                  position: "absolute",
                  alignItems: "center",
                }}>
                <Progress.Circle
                  size={itemWidth + 16}
                  progress={videoProgress}
                  borderWidth={0}
                  indeterminateAnimationDuration={1000}
                  thickness={isCounting ? 3 : 6}
                  strokeCap="round"
                  unfilledColor="#fff"
                  style={{
                    zIndex: 5,
                  }}
                  color="#FCAF45"
                />
              </View>
              <Animated.FlatList
                data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                pagingEnabled
                // viewabilityConfig={viewConfigRef.current}
                // onViewableItemsChanged={viewableItemChange}
                contentContainerStyle={{
                  paddingVertical: 16,
                  paddingHorizontal: padding,
                  zIndex: 2,
                  alignItems: "flex-end",
                }}
                style={{ zIndex: 2 }}
                decelerationRate={"fast"}
                showsHorizontalScrollIndicator={false}
                horizontal
                onScrollEndDrag={(e) => {
                  setSelectedCameraOption(
                    Math.round(e.nativeEvent.contentOffset.x / itemWidth)
                  );
                }}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  {
                    useNativeDriver: true,
                  }
                )}
                snapToInterval={itemWidth}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => (
                  <CameraOption
                    i={index}
                    scrollX={scrollX}
                    isCounting={isCounting}
                    setVideoProgress={setVideoProgress}
                    selectedCameraOption={selectedCameraOption}
                    setIsCounting={setIsCounting}
                  />
                )}
              />
            </View>

            {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View> */}
          </RNCamera>
        )}
        <View
          style={{
            width: "100%",
            backgroundColor: "black",
            flexDirection: "row",
            marginTop: "auto",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 32,
          }}>
          <Image
            source={Hacker}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: "#fff",
              paddingRight: 8,
            }}
          />
          <Animated.FlatList
            data={["POST", "REELS", "STORY", "LIVE"]}
            pagingEnabled
            contentContainerStyle={{
              paddingVertical: 16,
              paddingHorizontal: padding,
            }}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={false}
            horizontal
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX2 } } }],
              {
                useNativeDriver: true,
              }
            )}
            snapToInterval={offset * 2}
            // snapToAlignment="center"
            keyExtractor={(item) => item.toString()}
            renderItem={({ item, index }) => (
              <MediaOption i={index} text={item} scrollX2={scrollX2} />
            )}
          />
          <MIcons
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
            name="flip-camera-ios"
            size={36}
            color="#fff"
            style={{ paddingLeft: 8 }}
          />
        </View>
      </View>
    </>
  );
}
