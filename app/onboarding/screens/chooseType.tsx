import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useAccountStore } from "@lib/store";

import { Link } from "expo-router";

import { Button, useTheme } from "react-native-paper";

import { Image } from "expo-image";

type ImageAsset = {
  id: number;
  image: any;
};

// Single image for the Signup component
const signupImage: ImageAsset = {
  id: 1,
  image: require("@assets/images/onboardingImages/onboard1.png"),
};

const chooseType = ({ handleOptionSelect }) => {
  const accountCreated = useAccountStore((state) => state.accountCreated);
  const setAccountCreated = useAccountStore((state) => state.setAccountCreated);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={signupImage.image}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        resizeMode="cover"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: SCREEN_WIDTH * 0.08,
          position: "absolute",
          transform: [
            {
              translateY: SCREEN_HEIGHT * 0.355,
            },
            { translateX: SCREEN_WIDTH * 0.07 },
          ],
        }}
      >
        <Button
          mode="elevated"
          onPress={() => {
            handleOptionSelect("native");
          }}
          buttonColor="#292929"
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="account-edit"
              size={size * 5} // Adjust size to your liking
              color="#4bcef8"
            />
          )}
          style={{
            zIndex: 1,
            borderColor: "white",
            borderWidth: 1,
            justifyContent: "center", // Centers content vertically
            alignItems: "center", // Centers content horizontally
          }}
          contentStyle={{
            width: SCREEN_WIDTH * 0.4,
            height: SCREEN_HEIGHT * 0.18,
            padding: 0, // or adjust to your needs
            transform: [{ translateX: SCREEN_WIDTH * 0.015 }],
          }}
        >
          {""}
        </Button>

        <Button
          mode="elevated"
          buttonColor="#292929"
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="spotify"
              size={size * 5} // Adjust size to your liking
              color="#03e328"
            />
          )}
          onPress={() => handleOptionSelect("spotify")}
          style={{
            zIndex: 1,
            borderColor: "white",
            borderWidth: 1,
            justifyContent: "center", // Centers content vertically
            alignItems: "center",
          }}
          contentStyle={{
            width: SCREEN_WIDTH * 0.4,
            height: SCREEN_HEIGHT * 0.18,
            padding: 0, // or adjust to your needs
            transform: [{ translateX: SCREEN_WIDTH * 0.02 }],
          }}
        >
          {""}
        </Button>
      </View>

      <Button
        mode="text"
        onPress={() => console.log("Pressed")}
        buttonColor="#292929"
        textColor="white"
        style={{
          zIndex: 1,
          borderColor: "white",
          borderWidth: 0,
          width: SCREEN_WIDTH * 0.3,

          transform: [
            {
              translateY: SCREEN_HEIGHT * 0.76,
            },
            { translateX: SCREEN_WIDTH * 0.35 },
          ],
        }}
        labelStyle={{ fontWeight: "bold" }} // Add this line
      >
        Sign In
      </Button>
    </View>
  );
};

export default chooseType;
