//import liraries
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import Video from "react-native-video"
import { generateColor } from "./searchCards";
import Avatar from "../assets/icons/man.png";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import TouchableDoubleTap from "./commons/touchableDoubleTap";

// create a component
const Reel = ({ play, showComments, slideSend }) => {
  const [liked, setLiked] = useState(false);
  const [internalPlay, setInternalPlay] = useState(true);
  const ref = useRef(null);
  const expandAnim = useRef(new Animated.Value(1)).current;
  const likeAnim = useRef(new Animated.Value(0)).current;
  const pauseAnim = useRef(new Animated.Value(0)).current;

  const onDoubleTapLike = (button) => {
    if (!button) {
      setLiked(true);
      Animated.sequence([
        Animated.spring(likeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(200),
        Animated.timing(likeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setLiked((prev) => !prev);
    }
  };

  const onPause = () => {
    //
    Animated.timing(pauseAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setInternalPlay((prev) => !prev));
  };

  Animated.loop(
    Animated.sequence([
      Animated.timing(expandAnim, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(expandAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const middleAnim = expandAnim.interpolate({
    inputRange: [0.5, 1],
    outputRange: [1, 0.5],
  });

  const interpolOpacity = pauseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: !internalPlay ? [0, 1] : [1, 0],
  });

  useEffect(() => {
    if (ref.current && play && internalPlay) ref.current.replayAsync();
    setInternalPlay(true);
  }, [play]);

  return (
    <View style={{ flex: 1 }}>
      {!internalPlay && (
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            width: 60,
            height: 60,
            borderRadius: 30,
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: -30,
            marginTop: -30,
            bottom: 0,
            right: 0,
            zIndex: 55,
            opacity: interpolOpacity,
          }}>
          <FAIcon size={24} color="white" name="play" />
        </Animated.View>
      )}
      <Animated.View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 30,
          position: "absolute",
          top: "50%",
          left: "50%",
          marginLeft: -36,
          marginTop: -36,
          // bottom: 0,
          // right: 0,
          zIndex: 55,
          transform: [{ scale: likeAnim }],
        }}>
        <FAIcon size={72} color="red" name="heart" elevation={3} />
      </Animated.View>
      <View style={styles.topLayer}>
        <TouchableDoubleTap
          onPress={onPause}
          onDoublePress={() => onDoubleTapLike(false)}>
          <View
            style={[
              {
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              },
            ]}></View>
        </TouchableDoubleTap>
        <View style={[styles.caption]}>
          {/* caption header */}
          <View style={styles.captionHeader}>
            {/* Image */}
            <Image source={Avatar} style={styles.avatarLeft} />

            {/* User details */}
            {/* username + follow */}
            <View style={styles.usernameAndFollow}>
              <Text style={styles.username}>Buckets</Text>
              <Text style={styles.followButton}>Follow</Text>
            </View>
          </View>

          {/* caption text */}
          <Text style={styles.captionText}>The party was lit bro.</Text>

          <View style={styles.musicContainer}>
            <View style={styles.animation}>
              <Animated.View
                style={[styles.strobe, { transform: [{ scaleY: expandAnim }] }]}
              />
              <Animated.View
                style={[styles.strobe, { transform: [{ scaleY: middleAnim }] }]}
              />
              <Animated.View
                style={[styles.strobe, { transform: [{ scaleY: expandAnim }] }]}
              />
            </View>
            <Text style={styles.artist}>Oliver Tree</Text>
            <View style={styles.dot}></View>
            <Text style={styles.artist}>Life Goes On</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableWithoutFeedback onPress={() => onDoubleTapLike(true)}>
            <FAIcon
              name={liked ? "heart" : "heart-o"}
              size={28}
              color={liked ? "red" : "white"}
              style={{ marginVertical: 8, padding: 8 }}
            />
          </TouchableWithoutFeedback>
          <Text style={styles.actionText}>135k</Text>
          <TouchableWithoutFeedback onPress={showComments}>
            <Ionicon
              name="chatbubble-outline"
              size={28}
              color="white"
              style={{ marginVertical: 8, padding: 8 }}
            />
          </TouchableWithoutFeedback>
          <Text style={styles.actionText}>535</Text>
          <TouchableWithoutFeedback onPress={slideSend}>
            <Feather
              name="send"
              size={28}
              color="white"
              style={{ marginVertical: 8, padding: 8 }}
            />
          </TouchableWithoutFeedback>
          <Entypo
            name="dots-three-vertical"
            size={20}
            color="white"
            style={{ marginVertical: 8, padding: 8 }}
          />
          <Image source={Avatar} style={[styles.avatarRight]} />
        </View>
      </View>

      <Video
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        paused={!(play && internalPlay)}
        muted={false}
        ref={ref}
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        resizeMode="cover"
        repeat
        
      />
      {/* <View
        style={{
          flex: 1,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "tomato",
        }}></View> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  videoContainer: {
    // margin: 1,
    width: "100%",
    flex: 1,
  },
  topLayer: {
    flex: 1,
    zIndex: 99,
    height: "100%",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  caption: {
    width: "85%",
    alignSelf: "flex-end",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  usernameAndFollow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  username: {
    fontFamily: "Hel",
    fontSize: 14,
    color: "white",
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  followButton: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "white",
    paddingVertical: 4,
    alignSelf: "center",
    paddingHorizontal: 8,
    color: "white",
    fontFamily: "Hel_Light",
  },
  avatarLeft: {
    width: 32,
    height: 32,
    alignSelf: "center",
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  captionHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 16,
  },
  captionText: {
    color: "white",
    marginBottom: 16,
    fontFamily: "Hel_Light",
  },
  musicContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  animation: {
    marginHorizontal: 4,
    flexDirection: "row",
  },
  strobe: {
    backgroundColor: "white",
    height: 12,
    width: 3,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  artist: {
    color: "white",
    fontFamily: "Hel_Light",
    fontSize: 14,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginHorizontal: 6,
    backgroundColor: "white",
  },
  actions: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  avatarRight: {
    borderRadius: 8,
    width: 32,
    height: 32,
    marginVertical: 16,
    marginTop: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  actionText: {
    color: "white",
    fontFamily: "Hel_Light",
    fontSize: 12,
    top: -4,
  },
});

//make this component available to the app
export default Reel;
