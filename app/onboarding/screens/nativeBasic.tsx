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

import { supabase } from "@lib/supabase";

const InfoInput = ({ title, sub }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

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
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  // Conditionally return input label and state updater function
  const getInputProperties = () => {
    switch (title) {
      case "Full Name":
        return {
          label: "Full Name",
          value: fullName,
          setState: setFullName,
        };
      case "Email":
        return {
          label: "email@address.com",
          value: email,
          setState: setEmail,
        };
      case "Password":
        return {
          label: "Password",
          value: password,
          setState: setPassword,
        };
      case "Username":
        return {
          label: "@handle",
          value: username,
          setState: setUsername,
        };
      default:
        return {};
    }
  };

  const { label, value, setState } = getInputProperties();

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
        value={value}
        textColor="white"
        mode="flat"
        secureTextEntry={label == "Password" ? true : false}
        selectionColor="transparent"
        underlineColor="transparent"
        onChangeText={(text) => setState(text)}
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

const InformationInput = () => {
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
          <InfoInput title="Full Name" sub="Let's get to know eachother :)" />
          <InfoInput title="Email" sub="UMich Email preferred" />
          <InfoInput
            title="Password"
            sub="We'll keep this under wraps for ya..."
          />
          <InfoInput
            title="Username"
            sub="You might have your name as a unique handle👀"
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
