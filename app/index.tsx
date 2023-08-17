import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View } from "react-native";
import { Link } from "expo-router";
// import { useStore } from "@lib/store";
import {
  useIsPastWelcome,
  useAuthStore,
  useAccountStore,
  useClickStore,
} from "@lib/store";

import { useCallback, useState } from "react";

import { PaperProvider } from "react-native-paper";

import LoginFirst from "./logins/loginFirst";
import SignUp from "./onboarding/createAccount";

import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#292929",
  },
};

const App = () => {
  // From Welcome Store
  const isPastWelcome = useIsPastWelcome((state) => state.isPastWelcome);
  const setIsPastWelcome = useIsPastWelcome((state) => state.setIsPastWelcome);

  // From Auth Store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  // From Account Store
  const accountCreated = useAccountStore((state) => state.accountCreated);
  const setAccountCreated = useAccountStore((state) => state.setAccountCreated);

  // From Click Store
  const click = useClickStore((state) => state.click);

  const handlePastWelcome = () => {
    setIsPastWelcome(true);
  };

  if (!isPastWelcome) {
    return (
      <PaperProvider theme={theme}>
        <LoginFirst onPastWelcome={handlePastWelcome} />
      </PaperProvider>
    );
  } else if (!accountCreated) {
    return (
      <PaperProvider theme={theme}>
        <SignUp />
      </PaperProvider>
    );
  }
  return (
    <SafeAreaView className="flex-1 flex items-center justify-center space-y-8">
      <View>
        <Image
          className="w-56 h-56 rounded-md"
          source={require("@assets/images/tea.jpg")}
        />
        <Text>Gangshit</Text>
      </View>
      <Text className="text-xl">Welcome to TuneTrap</Text>
      <Link
        className="text-center w-48 bg-violet-400 text-md p-2"
        href="/hello"
      >
        Go to Another Page
      </Link>
      <Text className="text-xl">Look at the number of clicks: {click}</Text>
      <Link
        className="text-center w-48 bg-violet-400 text-md p-2"
        href="/clicks"
      >
        Go to Clicks Page
      </Link>
    </SafeAreaView>
  );
};

export default App;
