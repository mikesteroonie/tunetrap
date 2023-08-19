import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Alert,
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

import { supabase } from "@lib/supabase";

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

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);

  const flatListRef = useRef(null); // Reference to the FlatList
  const x = useSharedValue(0);

  const [scrollEnabled, setScrollEnabled] = useState(false);

  //State Setter for Option Select
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setScrollEnabled(true);

    // Transition to the next screen.
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 1, animated: true });
    }
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  async function signUpWithEmail() {
    setLoading(true);

    // First, sign up the user.
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: email, // make sure you use the variables you've set up
        password: password,
      }
    );

    // If there's an error with signing up, handle it.
    if (signUpError) {
      Alert.alert(signUpError.message);
      setLoading(false);
      return; // Return here to prevent further execution
    }

    // Insert data into the "profiles" table.
    const { data: insertData, error: insertError } = await supabase
      .from("profiles")
      .insert([
        {
          id: signUpData.user.id,
          username: username,
          firstname: firstName,
          lastname: lastName,
          imageUrl: image,
        },
      ]);

    // If there's an error with the insert operation, handle it.
    if (insertError) {
      Alert.alert(insertError.message);
      setLoading(false);
      return; // Return here to prevent further execution
    }

    // The user is already authenticated after sign up, so no need to sign them in again.

    setLoading(false);
  }

  //STATE SETTER 1: Email

  const handleEmailSet = (email) => {
    setEmail(email);
    console.log(email);
  };
  //STATE SETTER 2: Email

  const handlePasswordSet = (password) => {
    setPassword(password);
    console.log(password);
  };
  //STATE SETTER 3: Email

  const handleFullNameSet = (fullName) => {
    setFullName(fullName);
    console.log(fullName);
  };
  //STATE SETTER 4: Email

  const handleUsernameSet = (username) => {
    setUsername(username);
    console.log(username);
  };
  //STATE SETTER 5: Email

  const handleProfileSet = (image) => {
    setImage(image);
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const getDynamicScreens = () => {
    return [
      <Choose handleOptionSelect={handleOptionSelect} />,
      <InformationInput
        setEmail={handleEmailSet}
        setPassword={handlePasswordSet}
        setFullName={handleFullNameSet}
        setUsername={handleUsernameSet}
      />,
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
