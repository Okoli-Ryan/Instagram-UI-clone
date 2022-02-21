//import liraries
import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Video from "react-native-video"

export function generateColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// create a component
const SearchCardImage = ({ color }) => {
  return (
    <View style={[styles.imageContainer]}>
      <Image
        source={{
          uri: `https://picsum.photos/id/${Math.floor(
            Math.random() * 200
          )}/200`,
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const SearchCardVideo = () => {
  return (
    <View style={[styles.imageContainer, styles.videoContainer]}>
      <Video
        style={{ flex: 1 }}
        muted
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        resizeMode="cover"
        repeat
      />
    </View>
  );
};

const CardSection = ({ index }) => {
  const data = [];
  const data2 = [];
  for (let i = 0; i < 8; i++) {
    data.push({ color: generateColor(), id: i });
  }
  for (let i = 0; i < 2; i++) {
    data2.push({ color: generateColor(), id: i });
  }

  return (
    // <View>
    <View
      style={[
        { width: "100%" },
        index % 2 === 0
          ? { flexDirection: "row" }
          : { flexDirection: "row-reverse" },
      ]}>
      <FlatList
        data={data}
        scrollEnabled={false}
        numColumns={2}
        style={{ width: "66.66%" }}
        renderItem={({ item }) => (
          <SearchCardImage color={item.color} id={100 + item.id} />
        )}
        keyExtractor={(item) => item.id.toString()}
        listKey={(item) => item.id + "_key1"}
      />
      <FlatList
        data={data2}
        scrollEnabled={false}
        style={{ width: "33.34%" }}
        ListHeaderComponent={() => (
          <SearchCardVideo key={Math.random().toString()} />
        )}
        renderItem={({ item }) => (
          <SearchCardImage color={item.color} id={item.id} />
        )}
        keyExtractor={(item) => item.id.toString()}
        listKey={(item) => item.id + "_key2"}
      />
    </View>
    // </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: 120,
    position: "relative",
    margin: 1,
  },
  videoContainer: {
    height: 242,
    flex: 2,
    margin: 1,
  },
});

//make this component available to the app
export { SearchCardImage, SearchCardVideo, CardSection };
