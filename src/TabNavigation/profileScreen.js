import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  StatusBar,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import User from "../assets/images/lady.jpg";
import Avatar from "../assets/icons/hacker.png";
import MIcons from "react-native-vector-icons/MaterialIcons";
import SLIcons from "react-native-vector-icons/SimpleLineIcons";
import { generateColor } from "../components/searchCards";
import DiscoverCard from "../components/discoverCard";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const TabBarHeight = 48;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});
const tab1ItemSize = (windowWidth - 30) / 2;
const tab2ItemSize = (windowWidth - 40) / 3;

const App = () => {
  /**
   * stats
   */
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tab1", title: "Tab1", icon: "grid-on" },
    { key: "tab2", title: "Tab2", icon: "tag" },
  ]);
  const [HeaderHeight, setHeaderHeight] = useState(windowHeight);
  const [canScroll, setCanScroll] = useState(true);
  const tab1Data = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21,
  ];
  const tab2Data = [0, 1, 2, 3, 4];

  /**
   * ref
   */
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);

  /**
   * PanResponder for header
   */
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderRelease: (evt, gestureState) => {
        syncScrollOffset();
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        headerScrollY.setValue(scrollY._value);
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        listRefArr.current.forEach((item) => {
          if (item.key !== routes[_tabIndex.current].key) {
            return;
          }
          if (item.value) {
            item.value.scrollToOffset({
              offset: -gestureState.dy + headerScrollStart.current,
              animated: false,
            });
          }
        });
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    })
  ).current;

  /**
   * PanResponder for list in tab scene
   */
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
    })
  ).current;

  /**
   * effect
   */
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({ value }) => {
      listRefArr.current.forEach((item) => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HeaderHeight) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  /**
   *  helper functions
   */
  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  /**
   * render Helper
   */
  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[{ position: "absolute", transform: [{ translateY: y }] }]}
        onLayout={({ nativeEvent }) => {
          setHeaderHeight(nativeEvent.layout.height);
        }}>
        <StatusBar color="#fff" />

        <Animated.View
          {...headerPanResponder.panHandlers}
          style={[styles.header, { transform: [{ translateY: y }] }]}>
          <View style={styles.horizontal}>
            <Text style={styles.header_username}>okoli_ryan</Text>
            <MIcons size={20} name="keyboard-arrow-down" color="#000" />
          </View>
          <View style={[styles.horizontal]}>
            <View
              style={{
                marginRight: 24,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: "#000",
              }}>
              <MIcons size={20} name="add" color="#000" />
            </View>
            <SLIcons size={20} name="menu" color="#000" />
          </View>
        </Animated.View>
        <View style={[styles.horizontal, { padding: 16 }]}>
          <Image
            source={User}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 32,
            }}>
            <View style={styles.userDetail}>
              <Text style={{ fontSize: 16, fontFamily: "Hel" }}>29</Text>
              <Text style={{ fontFamily: "Hel_Light" }}>Posts</Text>
            </View>
            <View style={styles.userDetail}>
              <Text style={{ fontSize: 16, fontFamily: "Hel" }}>212</Text>
              <Text style={{ fontFamily: "Hel_Light" }}>Followers</Text>
            </View>
            <View style={[styles.userDetail]}>
              <Text style={{ fontSize: 16, fontFamily: "Hel" }}>221</Text>
              <Text style={{ fontFamily: "Hel_Light" }}>Following</Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 16 }}>
          <Text style={{ fontFamily: "Hel_Light", marginBottom: 2 }}>
            Web dev
          </Text>
          <Text style={{ fontFamily: "Hel_Light", marginBottom: 2 }}>
            Mobile dev
          </Text>
          <Text
            style={{ fontFamily: "Hel_Light", marginBottom: 2, color: "#000" }}>
            Computer Engineering Bsc.
          </Text>
          <Text
            style={{
              color: "#4596ff",
              fontFamily: "Hel_Light",
              marginBottom: 2,
            }}>
            #BallIsLife
          </Text>
        </View>
        <View
          style={[
            styles.horizontal,
            { padding: 16, paddingTop: 0, width: "100%" },
          ]}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderRadius: 6,
              borderColor: "rgba(0,0,0, .2)",
              marginRight: 6,
            }}>
            <Text
              style={{
                fontFamily: "Hel_Light",
                color: "#000",
                paddingVertical: 8,
              }}>
              Edit Profile
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              width: 35,
              height: 35,
              borderRadius: 6,
              borderColor: "rgba(0,0,0, .2)",
            }}>
            <SLIcons size={10} color="#000" name="arrow-down" />
          </View>
        </View>
        <View>
          <View
            style={[
              styles.horizontal,
              {
                justifyContent: "space-between",
                padding: 16,
                paddingTop: 8,
              },
            ]}>
            <Text style={{ fontFamily: "Hel_Light" }}>Discover people</Text>
            <Text style={{ fontFamily: "Hel_Light", color: "#4596ff" }}>
              See All
            </Text>
          </View>
          <FlatList
            data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
            renderItem={DiscoverCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginLeft: 16 }}
            keyExtractor={(item) => item.toString()}
          />
        </View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
          <Text style={{ fontFamily: "Hel" }}>Story Highlights</Text>
          <Text style={{ fontFamily: "Hel_Light", marginTop: 4 }}>
            Keep your favorite stories on your profile
          </Text>
          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <FlatList
              data={[0, 1, 2, 3, 4, 5, 6]}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={() => (
                <Image
                  source={Avatar}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: "#000",
                    padding: 4,
                    backgroundColor: "white",
                    marginRight: 32,
                  }}
                />
              )}
              keyExtractor={(item) => item.toString()}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  const rednerTab1Item = ({ item, index }) => {
    return (
      <View
        style={[
          {
            width: windowWidth / 3,
            backgroundColor: generateColor(),
            height: 120,
            marginBottom: 2,
          },
          item + (1 % 3) === 0 ? {} : { marginRight: 2 },
        ]}
      />
    );
  };

  const rednerTab2Item = ({ item, index }) => {
    return (
      <View
        style={[
          {
            width: windowWidth / 3,
            backgroundColor: generateColor(),
            height: 120,
            marginBottom: 2,
          },
          item + (1 % 3) === 0 ? {} : { marginRight: 2 },
        ]}
      />
    );
  };

  const renderLabel = ({ route, focused }) => {
    return (
      <MIcons name={route.icon} color={focused ? "#000" : "#aaa"} size={24} />
    );
  };

  const renderScene = ({ route }) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols = 3;
    let data;
    let renderItem;
    switch (route.key) {
      case "tab1":
        data = tab1Data;
        renderItem = rednerTab1Item;
        break;
      case "tab2":
        data = tab2Data;
        renderItem = rednerTab2Item;
        break;
      default:
        return null;
    }
    return (
      <Animated.FlatList
        // scrollEnabled={canScroll}
        {...listPanResponder.panHandlers}
        numColumns={numCols}
        ref={(ref) => {
          if (ref) {
            const found = listRefArr.current.find((e) => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
        scrollEventThrottle={16}
        onScroll={
          focused
            ? Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: scrollY } },
                  },
                ],
                { useNativeDriver: true }
              )
            : null
        }
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{
          paddingTop: HeaderHeight + TabBarHeight,
          minHeight: windowHeight - SafeStatusBar + HeaderHeight,
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: "absolute",
          transform: [{ translateY: y }],
          width: "100%",
        }}>
        <TabBar
          {...props}
          onTabPress={({ route, preventDefault }) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onSwipeStart={() => setCanScroll(false)}
        onSwipeEnd={() => setCanScroll(true)}
        onIndexChange={(id) => {
          _tabIndex.current = id;
          setIndex(id);
        }}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: windowWidth,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 0.5,
    paddingBottom: 8,
    borderBottomColor: "rgba(0, 0, 0, .2)",
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  header_username: {
    fontFamily: "Lobster",
    fontSize: 24,
  },
  user_image_container: {
    width: 100,
    height: 100,
  },
  userDetail: {
    flexShrink: 1,

    alignItems: "center",
  },
  label: { fontSize: 16, color: "#222" },
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: "#FFF",
    height: TabBarHeight,
  },
  indicator: { backgroundColor: "#222", height: 1, marginBottom: 1 },
});

export default App;
