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

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import InformationInput from "./screens/nativeBasic";
import Setup from "./screens/nativeProfileSetup";

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
  // CONSTS AND VARIABLES
  const accountCreated = useAccountStore((state) => state.accountCreated);
  const setAccountCreated = useAccountStore((state) => state.setAccountCreated);
  const theme = useTheme();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const [selectedOption, setSelectedOption] = useState("");

  const flatListRef = useRef(null); // Reference to the FlatList
  const x = useSharedValue(0);

  const [scrollEnabled, setScrollEnabled] = useState(false);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setScrollEnabled(true);

    // Transition to the next screen.
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 1, animated: true });
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const getDynamicScreens = () => {
    return [
      <Choose handleOptionSelect={handleOptionSelect} />,

      <InformationInput />,
      <Setup />,
    ];
  };

  //IMAGE ANIMATIONS-------------------------------------------------
  const drakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            x.value,
            [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
            [SCREEN_WIDTH * 0.75, -SCREEN_WIDTH * 0.2, -SCREEN_WIDTH],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const asapStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            x.value,
            [0, SCREEN_WIDTH],
            [-SCREEN_WIDTH * 0.1, -SCREEN_WIDTH],
            Extrapolate.CLAMP
          ),
        },
        { translateY: SCREEN_HEIGHT * 0.1 },
      ],
    };
  });

  const arianaStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            x.value,
            [0, SCREEN_WIDTH],
            [-SCREEN_WIDTH * 0.2, -SCREEN_WIDTH],
            Extrapolate.CLAMP
          ),
        },
        { translateY: SCREEN_HEIGHT * 0.5 },
      ],
    };
  });

  const weekndStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            x.value,
            [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
            [SCREEN_WIDTH * 0.7, -SCREEN_WIDTH * 0.2, -SCREEN_WIDTH],
            Extrapolate.CLAMP
          ),
        },
        { translateY: SCREEN_HEIGHT * 0.5 },
      ],
    };
  });

  const tswiftStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            x.value,
            [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
            [SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 0.7, -SCREEN_WIDTH * 0.2],
            Extrapolate.CLAMP
          ),
        },
        { translateY: SCREEN_HEIGHT * 0.1 },
      ],
    };
  });

  const coleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            x.value,
            [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
            [SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 0.7, -SCREEN_WIDTH * 0.2],
            Extrapolate.CLAMP
          ),
        },
        { translateY: SCREEN_HEIGHT * 0.5 },
      ],
    };
  });

  const jbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            x.value,
            [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
            [SCREEN_WIDTH * 3, SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 0.7],
            Extrapolate.CLAMP
          ),
        },
        { translateY: SCREEN_HEIGHT * 0.1 },
      ],
    };
  });

  const bbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            x.value,
            [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
            [SCREEN_WIDTH * 3, SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 0.7],
            Extrapolate.CLAMP
          ),
        },
        { translateY: SCREEN_HEIGHT * 0.5 },
      ],
    };
  });

  //RENDER ITEM FOR FLATLIST--------------------------------------------------------
  const renderItem = ({ item, index }) => (
    <Animated.View
      key={index}
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
      }}
    >
      {item}
    </Animated.View>
  );

  //RETURN STATEMENT FOR SIGNUP COMPONENT----------------------------------------
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
        style={[
          drakeStyle,
          {
            position: "absolute",
            width: SCREEN_WIDTH * 0.5,
            height: SCREEN_HEIGHT * 0.5,
          },
        ]}
      />

      <Animated.Image
        source={require("@assets/images/onboardingImages/art/ariana1.png")}
        resizeMode="contain"
        style={[
          arianaStyle,
          {
            position: "absolute",
            width: SCREEN_WIDTH * 0.5,
            height: SCREEN_HEIGHT * 0.5,
          },
        ]}
      />
      <Animated.Image
        source={require("@assets/images/onboardingImages/art/asap1.png")}
        resizeMode="contain"
        style={[
          asapStyle,
          {
            position: "absolute",
            width: SCREEN_WIDTH * 0.35,
            height: SCREEN_HEIGHT * 0.35,
          },
        ]}
      />
      <Animated.Image
        source={require("@assets/images/onboardingImages/art/weeknd1.png")}
        resizeMode="contain"
        style={[
          weekndStyle,
          {
            position: "absolute",
            width: SCREEN_WIDTH * 0.6,
            height: SCREEN_HEIGHT * 0.6,
          },
        ]}
      />
      <Animated.Image
        source={require("@assets/images/onboardingImages/art/tswift1.png")}
        resizeMode="contain"
        style={[
          tswiftStyle,
          {
            position: "absolute",
            width: SCREEN_WIDTH * 0.6,
            height: SCREEN_HEIGHT * 0.6,
          },
        ]}
      />
      <Animated.Image
        source={require("@assets/images/onboardingImages/art/cole1.png")}
        resizeMode="contain"
        style={[
          coleStyle,
          {
            position: "absolute",
            width: SCREEN_WIDTH * 0.6,
            height: SCREEN_HEIGHT * 0.6,
          },
        ]}
      />

      <Animated.Image
        source={require("@assets/images/onboardingImages/art/jb1.png")}
        resizeMode="contain"
        style={[
          jbStyle,
          {
            position: "absolute",
            width: SCREEN_WIDTH * 0.6,
            height: SCREEN_HEIGHT * 0.6,
          },
        ]}
      />

      <Animated.Image
        source={require("@assets/images/onboardingImages/art/bbunny1.png")}
        resizeMode="contain"
        style={[
          bbStyle,
          {
            position: "absolute",
            width: SCREEN_WIDTH * 0.6,
            height: SCREEN_HEIGHT * 0.6,
          },
        ]}
      />

      <Animated.FlatList
        ref={flatListRef as any}
        horizontal
        pagingEnabled
        scrollEnabled={scrollEnabled}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={getDynamicScreens()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onScroll={onScroll}
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
