import React, { useEffect, useState } from "react";

import {
  View,
  SafeAreaView,
  useWindowDimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { TextInput } from "react-native-paper";

import { Image } from "expo-image";

import * as ImagePicker from "expo-image-picker";

import { supabase } from "@lib/supabase";
const nativeProfileSetup = ({
  handlePicSet,
  handleArtistOne,
  handleArtistTwo,
  handleArtistThree,
  image,
  signUpWithEmail,
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [isFocusedOne, setIsFocusedOne] = useState(false);
  const [touchedOne, setTouchedOne] = useState(false);
  const [inputValueOne, setInputValueOne] = useState("");

  const [isFocusedTwo, setIsFocusedTwo] = useState(false);
  const [touchedTwo, setTouchedTwo] = useState(false);
  const [inputValueTwo, setInputValueTwo] = useState("");

  const [isFocusedThree, setIsFocusedThree] = useState(false);
  const [touchedThree, setTouchedThree] = useState(false);
  const [inputValueThree, setInputValueThree] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      handlePicSet(result.assets[0].uri);
    }
  };
  const uploadImageToSupabase = async (imageUri, imageName) => {
    // Read the image into memory
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Upload the image to Supabase
    const { data, error } = await supabase.storage
      .from("profile_pics") // Replace with your Supabase bucket name
      .upload(`${imageName}.jpg`, blob, {
        cacheControl: "3600",
        upsert: false,
      });

    // Handle the upload response
    if (error) {
      console.error("Error uploading image:", error);
      return;
    }

    console.error("Successfully uploaded image:", data);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        transform: [
          {
            translateX: SCREEN_WIDTH * 0.1,
          },
          { translateY: SCREEN_HEIGHT * 0.2 },
        ],
        width: SCREEN_WIDTH * 0.85, // Set width here
      }}
    >
      <Text style={{ fontSize: 30 }} className="font-bold text-white">
        Profile Photo
      </Text>
      <Text
        style={{ fontSize: 15, flexWrap: "wrap" }}
        className="font-med text-white"
      >
        Lets see that cute face of yours...
      </Text>

      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          paddingBottom: 20,
        }}
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
              marginBottom: 20,
            }}
          />
        )}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            paddingVertical: 20, // Less padding on top and bottom
            paddingHorizontal: 50,
            borderRadius: 10,
            backgroundColor: "#d7f2f7", // Assuming a light gray background. Adjust as needed.
          }}
        >
          <Text className="font-bold" style={{ color: "#45c8f9" }}>
            {!image ? `Choose Image` : `Change Image`}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 30 }} className="font-bold text-white">
        Top 3 Artists
      </Text>
      <Text
        style={{ fontSize: 15, flexWrap: "wrap" }}
        className="font-med text-white"
      >
        This will display on your profile and be like a "badge". You'll see
        later.
      </Text>
      <TextInput
        label="Artist 1"
        textColor="white"
        mode="flat"
        selectionColor="transparent"
        underlineColor="transparent"
        onFocus={() => {
          setIsFocusedOne(true);
        }}
        onBlur={() => {
          setIsFocusedOne(false);
          setTouchedOne(true);
        }}
        onChangeText={(text) => {
          handleArtistOne(text);
          setInputValueOne(text);
        }}
        style={[
          {
            backgroundColor: "#292929",
            width: SCREEN_WIDTH * 0.7,
            borderRadius: 5,

            marginTop: SCREEN_HEIGHT * 0.01,
          },
          !isFocusedOne && !inputValueOne && touchedOne
            ? { borderColor: "red", borderWidth: 1 }
            : {},
        ]}
      />

      <TextInput
        label="Artist 2"
        textColor="white"
        mode="flat"
        selectionColor="transparent"
        underlineColor="transparent"
        onFocus={() => {
          setIsFocusedTwo(true);
        }}
        onBlur={() => {
          setIsFocusedTwo(false);
          setTouchedTwo(true);
        }}
        onChangeText={(text) => {
          handleArtistTwo(text);
          setInputValueTwo(text);
        }}
        style={[
          {
            backgroundColor: "#292929",
            width: SCREEN_WIDTH * 0.7,
            borderRadius: 5,
            marginTop: SCREEN_HEIGHT * 0.01,
          },
          !isFocusedTwo && !inputValueTwo && touchedTwo
            ? { borderColor: "red", borderWidth: 1 }
            : {},
        ]}
      />

      <TextInput
        label="Artist 3"
        textColor="white"
        mode="flat"
        selectionColor="transparent"
        underlineColor="transparent"
        onFocus={() => {
          setIsFocusedThree(true);
        }}
        onBlur={() => {
          setIsFocusedThree(false);
          setTouchedThree(true);
        }}
        onChangeText={(text) => {
          handleArtistThree(text);
          setInputValueThree(text);
        }}
        style={[
          {
            backgroundColor: "#292929",
            width: SCREEN_WIDTH * 0.7,
            borderRadius: 5,
            marginTop: SCREEN_HEIGHT * 0.01,
          },
          !isFocusedThree && !inputValueThree && touchedThree
            ? { borderColor: "red", borderWidth: 1 }
            : {},
        ]}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#4bcef8",
          padding: 10,
          marginTop: 10,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: SCREEN_WIDTH * 0.2,
          width: SCREEN_WIDTH * 0.4,
        }}
        onPress={signUpWithEmail}
      >
        <Text style={{ color: "white", fontSize: 16 }} className="font-med">
          SUBMIT
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default nativeProfileSetup;
