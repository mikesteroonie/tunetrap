import LoadingScreen from "@components/loadingscreen";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useCallback } from "react";
import * as Font from "expo-font";

import { Image } from "react-native";
import { data, type Data } from "./logins/welcome/welcomedata";

import { useAuthStore } from "@lib/authStore/authStore";

SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const subscribeToAuthChanges = useAuthStore(
    (state) => state.subscribeToAuthChanges
  );

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
          DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
          DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded) {
          SplashScreen.hideAsync();
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAppIsReady(true);
      }
    }

    subscribeToAuthChanges();

    prepare();
  }, []);

  return (
    <>
      {/* If app is ready (fonts loaded, API calls made, etc) then app loads else splash screen is shown */}
      {!appIsReady ? <LoadingScreen /> : <Slot />}
    </>
  );
};

export default AppLayout;
