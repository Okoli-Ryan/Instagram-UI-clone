//import liraries
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Menu from "../assets/icons/menu.png";
import AvatarImage from "../assets/icons/gamer.png";
import Add from "../assets/icons/add.png";
import AvatarImage2 from "../assets/icons/man.png";
import Picture from "../assets/images/lady2.jpg";
import HeartOutline from "../assets/icons/heart.png";
import RedHeart from "../assets/icons/red-heart.png";
import Hands from "../assets/icons/hands.png";
import Chat from "../assets/icons/chat.png";
import Send from "../assets/icons/send.png";
import BookmarkFilled from "../assets/icons/bookmark_filled.png";
import BookmarkOutline from "../assets/icons/bookmark_outline.png";
import CommentModal from "./commentModal";
import OptionsModal from "./optionsModal";
import {
  PinchGestureHandler,
  State,
  Swipeable,
} from "react-native-gesture-handler";
// create a component

const MiniComments = () => {
  const [like, setLike] = useState(false);

  const onLike = () => {
    setLike((prev) => !prev);
  };
  return (
    <View
      style={[
        styles.row,
        styles.cardButtonContainer,

        { alignItems: "center", paddingRight: 8 },
      ]}>
      <Text style={[styles.text]}>
        Temia55 <Text style={[styles.light]}>There's more to see</Text>
      </Text>
      <TouchableOpacity onPress={onLike}>
        <Image
          source={like ? RedHeart : HeartOutline}
          style={styles.miniLike}
        />
      </TouchableOpacity>
    </View>
  );
};
const PostCard = () => {
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;

  const onPinchEvent = Animated.event([{ nativeEvent: { scale: scale } }], {
    useNativeDriver: true,
  });

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
    // console.log(event.nativeEvent);
    // console.log(GestureHandler);
  };

  const onLike = () => {
    setLike((prev) => !prev);
  };

  const onBookmark = () => {
    setBookmark((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Comment Modal */}
      <CommentModal visible={visible} disableModal={() => setVisible(false)} />
      <OptionsModal
        visible={menuVisible}
        disableModal={() => setMenuVisible(false)}
      />
      {/* //Card Header */}
      <View
        style={[
          styles.row,
          {
            justifyContent: "space-between",
            // elevation: 3,
            alignItems: "center",
          },
        ]}>
        {/* //User Details */}
        <View style={[styles.row, styles.userDetails]}>
          {/* //Avatar */}
          <Image source={AvatarImage} style={styles.avatar} />
          {/* //Sub User Details */}
          <View style={styles.subUserDetails}>
            {/* //Name and follow button */}
            <View style={[styles.row, { alignItems: "center" }]}>
              {/* //Name */}
              <Text style={styles.text}>Okoliryan_50</Text>
              {/* //dot */}
              <View style={styles.dot} />
              {/* //Follow Button */}
              <Text style={[styles.text, styles.follow]}>Follow</Text>
            </View>
            {/* //Location */}
            <Text style={[styles.text, styles.location, { fontSize: 12 }]}>
              Lagos, Nigeria
            </Text>
          </View>
        </View>
        {/* //Menu Container */}
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.menuContainer}>
          {/* //Menu Button */}
          <Image source={Menu} style={styles.menu} />
        </TouchableOpacity>
      </View>
      {/* //Card Image */}
      <View style={{ width: "100%", height: 400 }}>
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Animated.Image
            source={Picture}
            style={[
              styles.w100,
              {
                height: 400,
                zIndex: 2,
                transform: [
                  {
                    scale: scale,
                  },
                ],
              },
            ]}
          />
        </PinchGestureHandler>
      </View>
      {/* //Card Buttons Container */}
      <View
        style={[styles.cardButtonContainer, styles.mv, { paddingRight: 8 }]}>
        {/* //Card Buttons Left */}
        <View onPress={onLike} style={[styles.row, styles.buttonContainer]}>
          <TouchableOpacity onPress={onLike}>
            <Image
              source={like ? RedHeart : HeartOutline}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={Chat}
              style={[styles.icon, { marginHorizontal: 16 }]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Send} style={styles.icon} />
          </TouchableOpacity>
        </View>
        {/* //Bookmark Container */}
        <TouchableOpacity
          onPress={onBookmark}
          style={[
            styles.buttonContainer,
            styles.row,
            styles.buttonContainerRight,
          ]}>
          <Image
            source={bookmark ? BookmarkFilled : BookmarkOutline}
            style={[styles.icon]}
          />
        </TouchableOpacity>
      </View>
      {/* //Liked by Text */}
      <Text
        style={[
          styles.text,
          styles.light,
          styles.w100,
          { alignSelf: "center", paddingHorizontal: 16, paddingVertical: 2 },
        ]}>
        Liked by <Text style={[styles.text]}>EasyMoneySniper</Text>
      </Text>
      {/* //Poster */}
      <Text
        style={[
          styles.text,
          styles.w100,
          { alignSelf: "center", paddingHorizontal: 16, paddingVertical: 2 },
        ]}>
        Stephan_Diggs{" "}
        <Text style={styles.light}>It was quite the experience</Text>
      </Text>
      {/* //View Comments */}
      <Text
        style={[
          styles.text,
          styles.addComment,
          styles.w100,
          { alignSelf: "center", paddingHorizontal: 16, paddingVertical: 2 },
        ]}>
        View all 25 comments
      </Text>
      {/* //Comments */}
      <MiniComments />
      {/* //Comment section */}
      <Pressable
        onPress={() => setVisible(true)}
        style={[
          styles.cardButtonContainer,
          {
            alignItems: "center",
            // marginVertical: 0,
            paddingHorizontal: 0,
            paddingRight: 8,
          },
        ]}>
        {/* //Comment Section Left */}
        <View
          style={[
            styles.buttonContainer,
            styles.row,
            { alignItems: "center" },
          ]}>
          <Image source={AvatarImage2} style={[styles.avatar]} />
          <Text style={[styles.text, styles.light, styles.addComment]}>
            Add a comment...
          </Text>
        </View>
        {/* //emojis container */}
        <View style={[styles.row, styles.buttonContainerRight]}>
          <Image source={RedHeart} style={styles.miniLike} />
          <Image source={Hands} style={[styles.miniLike]} />
          <View>
            <Image source={Add} style={styles.miniLike} />
          </View>
        </View>
      </Pressable>
      {/* //Time */}
      <Text
        style={[
          styles.w100,
          styles.text,
          styles.time,
          styles.addComment,
          styles.light,
          { marginLeft: 32, fontSize: 10 },
        ]}>
        1 day ago
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 8,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "black",
    marginHorizontal: 6,
    top: -2,
  },
  text: {
    fontFamily: "Hel",
    fontSize: 14,
    color: "black",
  },
  follow: {
    color: "#4a8fff",
    fontFamily: "Hel_Light",
  },
  location: {
    color: "black",
    fontFamily: "Hel_Light",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  subUserDetails: {
    justifyContent: "space-between",
    paddingVertical: 4,
    alignItems: "flex-start",
  },
  avatar: {
    height: 28,
    width: 28,
    borderRadius: 14,
    marginLeft: 16,
    marginRight: 8,
  },
  userDetails: {
    width: "90%",
    alignItems: "center",
  },
  menuContainer: {
    width: "10%",
    alignItems: "flex-end",
    paddingRight: 16,
  },
  menu: {
    width: 16,
    height: 16,
  },
  w100: {
    width: "100%",
  },
  icon: {
    height: 24,
    width: 24,
  },
  buttonContainer: {
    width: "50%",
  },
  buttonContainerRight: {
    justifyContent: "flex-end",
  },
  cardButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  mv: {
    marginVertical: 8,
  },
  light: {
    fontFamily: "Hel_Light",
  },
  miniLike: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
    paddingRight: 8,
  },
  addComment: {
    color: "#aaa",
  },
  time: {
    textAlign: "left",
  },
});

//make this component available to the app
export default PostCard;
