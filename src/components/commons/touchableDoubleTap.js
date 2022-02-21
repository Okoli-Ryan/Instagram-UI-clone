//import liraries
import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

// create a component
const TouchableDoubleTap = (props) => {
  const firstPress = useRef(true);
  const lastTap = useRef(new Date());
  const timer = useRef(false);

  const handleDoubleTap = () => {
    const now = new Date().getTime();

    if (firstPress.current) {
      firstPress.current = false;

      timer.current = setTimeout(() => {
        props.onPress ? props.onPress() : null;

        firstPress.current = true;
        timer.current = false;
      }, 300);

      lastTap.current = now;
    } else {
      if (now - lastTap.current < 300) {
        timer.current && clearTimeout(timer.current);

        props.onDoublePress ? props.onDoublePress() : null;

        firstPress.current = true;
      }
    }
  };

  return (
    <TouchableWithoutFeedback {...props} onPress={handleDoubleTap}>
      {props.children}
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default TouchableDoubleTap;
