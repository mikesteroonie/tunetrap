import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

import { useState, useRef } from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useAccountStore } from "@lib/store";

import { Link } from "expo-router";

import { Button, useTheme } from "react-native-paper";

import { Image } from "expo-image";

import Choose from "./screens/chooseType";

import Animated, { Extrapolate } from "react-native-reanimated";

import InformationInput from "./screens/nativeBasic";

type ImageAsset = {
  id: number;
  image: any;
};

// Single image for the Signup component
const signupImage: ImageAsset = {
  id: 1,
  image: require("@assets/images/onboardingImages/account.png"),
};

const Signup = () => {
  const accountCreated = useAccountStore((state) => state.accountCreated);
  const setAccountCreated = useAccountStore((state) => state.setAccountCreated);
  const theme = useTheme();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const scrollX = new Animated.Value(0);

  const backgroundImageTranslateDrake = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
    outputRange: [SCREEN_WIDTH * 0.75, -SCREEN_WIDTH * 0.2, -SCREEN_WIDTH],
    extrapolate: Extrapolate.CLAMP,
  });
  const backgroundImageTranslateASAP = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [-SCREEN_WIDTH * 0.1, -SCREEN_WIDTH],
    extrapolate: Extrapolate.CLAMP,
  });
  const backgroundImageTranslateAriana = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [-SCREEN_WIDTH * 0.2, -SCREEN_WIDTH],
    extrapolate: Extrapolate.CLAMP,
  });
  const backgroundImageTranslateWeeknd = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
    outputRange: [SCREEN_WIDTH * 0.7, -SCREEN_WIDTH * 0.2, -SCREEN_WIDTH],
    extrapolate: Extrapolate.CLAMP,
  });
  const backgroundImageTranslateTSwift = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
    outputRange: [SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 0.7, -SCREEN_WIDTH * 0.2],
    extrapolate: Extrapolate.CLAMP,
  });
  const backgroundImageTranslateCole = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
    outputRange: [SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 0.7, -SCREEN_WIDTH * 0.2],
    extrapolate: Extrapolate.CLAMP,
  });
  const backgroundImageTranslateJB = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
    outputRange: [SCREEN_WIDTH * 3, SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 0.7],
    extrapolate: Extrapolate.CLAMP,
  });
  const backgroundImageTranslateBB = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
    outputRange: [SCREEN_WIDTH * 3, SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 0.7],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacityAnimation = (index) =>
    scrollX.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0, 1, 0],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

  const translateYAnimation = (index) =>
    scrollX.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [50, 0, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

  const [selectedOption, setSelectedOption] = useState("");

  const flatListRef = useRef(null); // Reference to the FlatList

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    // Transition to the next screen.
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 1, animated: true });
    }
  };

  const renderItem = ({ index }) => (
    <Animated.View
      key={index}
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        opacity: opacityAnimation(index),
        transform: [{ translateY: translateYAnimation(index) }],
      }}
    >
      {index === 0 ? (
        <Choose handleOptionSelect={handleOptionSelect} />
      ) : index === 0 && selectedOption === "native" ? (
        <InformationInput />
      ) : null}
    </Animated.View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Image
        source={signupImage.image}
        style={{
          width: SCREEN_HEIGHT * 0.35,
          height: SCREEN_HEIGHT * 0.35,
          position: "absolute",
          zIndex: 10,
          transform: [
            {
              translateX: SCREEN_WIDTH * 0.15,
            },
            { translateY: -SCREEN_HEIGHT * 0.05 },
          ],
        }}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("@assets/images/onboardingImages/art/drakeart.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.5,
          height: SCREEN_HEIGHT * 0.5,
          transform: [{ translateX: backgroundImageTranslateDrake }],
        }}
      />
      <Animated.Image
        source={require("@assets/images/onboardingImages/art/ariana1.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.5,
          height: SCREEN_HEIGHT * 0.5,
          transform: [
            {
              translateX: backgroundImageTranslateAriana,
              translateY: SCREEN_HEIGHT * 0.5,
            },
          ],
        }}
      />
      <Animated.Image
        source={require("@assets/images/onboardingImages/art/asap1.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.35,
          height: SCREEN_HEIGHT * 0.35,
          transform: [
            {
              translateX: backgroundImageTranslateASAP,
              translateY: SCREEN_HEIGHT * 0.1,
            },
          ],
        }}
      />
      <Animated.Image
        source={require("@assets/images/onboardingImages/art/weeknd1.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.6,
          height: SCREEN_HEIGHT * 0.6,
          transform: [
            {
              translateX: backgroundImageTranslateWeeknd,
              translateY: SCREEN_HEIGHT * 0.5,
            },
          ],
        }}
      />
      <Animated.Image
        source={require("@assets/images/onboardingImages/art/tswift1.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.6,
          height: SCREEN_HEIGHT * 0.6,
          transform: [
            {
              translateX: backgroundImageTranslateTSwift,
              translateY: SCREEN_HEIGHT * 0.1,
            },
          ],
        }}
      />
      <Animated.Image
        source={require("@assets/images/onboardingImages/art/cole1.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.6,
          height: SCREEN_HEIGHT * 0.6,
          transform: [
            {
              translateX: backgroundImageTranslateCole,
              translateY: SCREEN_HEIGHT * 0.5,
            },
          ],
        }}
      />

      <Animated.Image
        source={require("@assets/images/onboardingImages/art/jb1.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.6,
          height: SCREEN_HEIGHT * 0.6,
          transform: [
            {
              translateX: backgroundImageTranslateJB,
              translateY: SCREEN_HEIGHT * 0.1,
            },
          ],
        }}
      />

      <Animated.Image
        source={require("@assets/images/onboardingImages/art/bbunny1.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.6,
          height: SCREEN_HEIGHT * 0.6,
          transform: [
            {
              translateX: backgroundImageTranslateBB,
              translateY: SCREEN_HEIGHT * 0.5,
            },
          ],
        }}
      />

      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={Array(3).fill(null)} // For 3 pages/screens
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          },
        ])}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    left: 0,
    right: 0,
  },
});

export default Signup;
