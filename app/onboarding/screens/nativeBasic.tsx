import React, { useEffect } from "react";

import {
  View,
  SafeAreaView,
  useWindowDimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { TextInput } from "react-native-paper";

import { useState } from "react";

const InfoInput = ({ title, sub, onTextChange }) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  // Conditionally return input label and state updater function
  //NOT NEEDED ANY MORE DO TO LIFTING UP STATE FROM PARENT COMPONENT
  // const getInputProperties = () => {
  //   switch (title) {
  //     case "Full Name":
  //       return {
  //         label: "Full Name",
  //         value: fullName,
  //         setState: setFullName,
  //       };
  //     case "Email":
  //       return {
  //         label: "email@address.com",
  //         value: email,
  //         setState: setEmail,
  //       };
  //     case "Password":
  //       return {
  //         label: "Password",
  //         value: password,
  //         setState: setPassword,
  //       };
  //     case "Username":
  //       return {
  //         label: "@handle",
  //         value: username,
  //         setState: setUsername,
  //       };
  //     default:
  //       return {};
  //   }
  // };

  // const { label, value, setState } = getInputProperties();
  let label = "";

  if (title === "Full Name") {
    label = "Full Name";
  } else if (title === "Email") {
    label = "email@address.com";
  } else if (title === "Password") {
    label = "Password";
  } else if (title === "Username") {
    label = "@handle";
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <Text style={{ fontSize: 30 }} className="font-bold text-white">
        {title}
      </Text>
      <Text style={{ fontSize: 15 }} className="font-med text-white">
        {sub}
      </Text>
      <TextInput
        label={label}
        textColor="white"
        mode="flat"
        secureTextEntry={title == "Password" ? true : false}
        selectionColor="transparent"
        underlineColor="transparent"
        autoCapitalize="none"
        onChangeText={(text) => {
          console.log(`Input for ${title}:`, text);
          onTextChange(text);
        }}
        style={{
          backgroundColor: "#292929",
          width: SCREEN_WIDTH * 0.7,
          borderRadius: 5,

          marginTop: SCREEN_HEIGHT * 0.01,
        }}
      />
    </SafeAreaView>
  );
};

const InformationInput = ({
  handleFullNameSet,
  handleUsernameSet,
  handleEmailSet,
  handlePasswordSet,
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [isUsernameFocused, setUsernameFocus] = useState(false);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        transform: [
          {
            translateX: SCREEN_WIDTH * 0.1,
          },
          { translateY: SCREEN_HEIGHT * 0.2 },
        ],
      }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: isUsernameFocused
              ? SCREEN_HEIGHT * 0.8
              : SCREEN_HEIGHT * 0.25,
            gap: 4,
          }}
        >
          <InfoInput
            title="Full Name"
            sub="Let's get to know eachother :)"
            onTextChange={handleFullNameSet}
          />
          <InfoInput
            title="Email"
            sub="UMich Email preferred"
            onTextChange={handleEmailSet}
          />
          <InfoInput
            title="Password"
            sub="We'll keep this under wraps for ya..."
            onTextChange={handlePasswordSet}
          />
          <InfoInput
            title="Username"
            sub="You might have your name as a unique handle👀"
            onTextChange={handleUsernameSet}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#4bcef8",
              padding: 10,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              margin: 80,
              width: SCREEN_WIDTH * 0.4,
            }}
            onPress={() => {
              console.log("pressed");
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }} className="font-med">
              Next
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default InformationInput;
