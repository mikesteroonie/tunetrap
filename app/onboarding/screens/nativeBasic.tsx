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

const InfoInput = ({ title, sub, onTextChange, hasTried }) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  console.log(`Received onTextChange for ${title}:`, onTextChange);
  const [inputValue, setInputValue] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [touched, setTouched] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

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
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          if (title === "Email" && inputValue) {
            setIsValidEmail(validateEmail(inputValue));
          }
          setTouched(true);
        }}
        error={hasTried && !inputValue}
        secureTextEntry={title == "Password" ? true : false}
        selectionColor="transparent"
        underlineColor="transparent"
        autoCapitalize="none"
        onChangeText={(text) => {
          setInputValue(text);
          onTextChange(text);
          // console.warn(`Input for ${title}:`, text);
        }}
        style={[
          {
            backgroundColor: "#292929",
            width: SCREEN_WIDTH * 0.7,
            borderRadius: 5,

            marginTop: SCREEN_HEIGHT * 0.01,
          },
          !isFocused && !inputValue && touched
            ? { borderColor: "red", borderWidth: 1 }
            : {},
          title === "Email" && !isValidEmail
            ? { borderColor: "red", borderWidth: 1 }
            : {},
        ]}
      />
      {hasTried && !inputValue && (
        <Text style={{ color: "red", flex: 1 }}>This field is required.</Text>
      )}

      {title === "Email" && !isValidEmail && (
        <Text style={{ color: "red", flex: 1 }}>Not a valid email format</Text>
      )}
    </SafeAreaView>
  );
};

const InformationInput = ({
  handleFullNameSet,
  handleUsernameSet,
  handleEmailSet,
  handlePasswordSet,
  handleNextLogging,
  handlePutFirst,
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [isUsernameFocused, setUsernameFocus] = useState(false);
  const [hasTried, setHasTried] = useState(false);
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
            hasTried={hasTried}
          />
          <InfoInput
            title="Email"
            sub="UMich Email preferred"
            onTextChange={handleEmailSet}
            hasTried={hasTried}
          />
          <InfoInput
            title="Password"
            sub="We'll keep this under wraps for ya..."
            onTextChange={handlePasswordSet}
            hasTried={hasTried}
          />
          <InfoInput
            title="Username"
            sub="You might have your name as a unique handle👀"
            onTextChange={handleUsernameSet}
            hasTried={hasTried}
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
              handleNextLogging();
              setHasTried(true);
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
