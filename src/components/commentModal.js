//import liraries
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Flame from "../assets/icons/flame.png";
import InLove from "../assets/icons/heart-eyes.png";
import Cry from "../assets/icons/crying.png";
import Laugh from "../assets/icons/laughing.png";
import Heart from "../assets/icons/red-heart.png";
import Hands from "../assets/icons/hands.png";
import Shocked from "../assets/icons/shocked.png";
import Avatar from "../assets/icons/man.png";

// create a component
const CommentModal = ({ visible, disableModal }) => {
  useEffect(() => {
    const hideModal = Keyboard.addListener("keyboardDidHide", () => {
      disableModal();
    });

    return () => {
      hideModal.remove();
    };
  }, []);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              //   backgroundColor: "red",
            }}></View>
        </TouchableWithoutFeedback>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingVertical: 8,
                width: "100%",
                alignItems: "center",
                borderBottomWidth: 0.4,
                borderColor: "#ddd",
              }}>
              <Image source={Flame} style={styles.icon} />
              <Image source={InLove} style={styles.icon} />
              <Image source={Cry} style={styles.icon} />
              <Image source={Laugh} style={styles.icon} />
              <Image source={Heart} style={styles.icon} />
              <Image source={Shocked} style={styles.icon} />
              <Image source={Hands} style={styles.icon} />
            </View>
            <View
              style={{
                position: "relative",
                width: "100%",
                flexDirection: "row",
                paddingVertical: 4,
              }}>
              <View style={{ width: "85%", flexDirection: "row" }}>
                <Image source={Avatar} style={styles.avatar} />
                <TextInput
                  placeholder="Add a comment..."
                  multiline
                  showSoftInputOnFocus
                  autoFocus
                  style={{
                    fontFamily: "Hel_Light",
                    paddingVertical: 8,
                    textAlign: "left",
                    paddingLeft: 60,
                    width: "100%",
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={disableModal}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "15%",
                  alignItems: "center",
                }}>
                <Text style={{ color: "#4a8fff", paddingRight: 16 }}>Post</Text>
              </TouchableOpacity>
            </View>
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
export default CommentModal;
