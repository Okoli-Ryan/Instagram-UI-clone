//import liraries
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import GestureRecognizer from "react-native-swipe-gestures";
import Modal from "react-native-modal";
// create a component
const OptionsModal = ({ visible, disableModal }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        //   animationT="slide"
        backdropOpacity={0.3}
        // visible={visible}
        // useNativeDriver
        swipeDirection="down"
        useNativeDriverForBackdrop
        style={{ margin: 0 }}
        onSwipeComplete={disableModal}
        propagateSwipe
        // onBackdropPress={disableModal}
        isVisible={visible}
        onRequestClose={() => {}}>
        {/* <View style={styles.centeredView}> */}
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}>
          <TouchableWithoutFeedback onPress={disableModal}>
            <View
              style={{
                // position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}></View>
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View
              style={{
                width: 40,
                backgroundColor: "#ddd",
                height: 4,
                borderRadius: 6,
                alignSelf: "center",
                marginBottom: 16,
              }}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Report...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Why you're seeing this post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Hide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Copy Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Share to...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Unfollow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    fontFamily: "Hel",
    textAlign: "left",
    padding: 16,
  },
  button: {
    width: "100%",
  },
  icon: {
    // Horizontal: 8,
    width: 24,
    height: 24,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    position: "absolute",
    left: 16,
    top: 8,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 20,
    paddingTop: 16,
    // alignSelf: "center",
    // bottom: 0,
    borderTopRightRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
    // zIndex: 99,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

//make this component available to the app
export default OptionsModal;
