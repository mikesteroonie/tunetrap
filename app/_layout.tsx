import LoadingScreen from "@components/loadingscreen";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useCallback } from "react";
import * as Font from "expo-font";

import { Image } from "react-native";
import { data, type Data } from "./logins/welcome/welcomedata";

SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

    prepare();
  }, []);
  //   async function prepare() {
  //     try {
  //       // Pre-load fonts, make any API calls you need to do here
  //       // before your app loads up.

  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience.

  //       await Font.loadAsync({
  //         DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
  //         DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
  //         DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  //       });

  //       if (fontsLoaded) {
  //         //only show homepage if fonts are loaded
  //         await SplashScreen.hideAsync();
  //       }
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, [fontsLoaded]);

  return (
    <>
      {/* If app is ready (fonts loaded, API calls made, etc) then app loads else splash screen is shown */}
      {!appIsReady ? <LoadingScreen /> : <Slot />}
    </>
  );
};

export default AppLayout;
