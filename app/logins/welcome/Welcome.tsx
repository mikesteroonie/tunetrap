import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
  Image,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

//   import { Image } from "expo-image";

import { Button } from "./Button";
import { Pagination } from "./Pagination";
import { data, type Data } from "./welcomedata";

import { useEffect } from "react";

import { Asset } from "expo-asset";
import { useTheme } from "react-native-paper";

const RenderItem = ({
  item,
  index,
  x,
}: {
  item: Data;
  index: number;
  x: SharedValue<number>;
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const imageAnimatedStyle = useAnimatedStyle(() => {
    let width = SCREEN_WIDTH * 0.5;
    let height = SCREEN_WIDTH * 0.5;

    let translateXValue = 0;
    let translateYValue = 0;

    switch (index) {
      case 0:
        translateXValue = 10;
        translateYValue = 20;
        break;
      case 1:
        translateXValue = -SCREEN_WIDTH * 0.1;
        translateYValue = -SCREEN_HEIGHT * 0.14;
        break;
      case 2:
        translateXValue = -SCREEN_WIDTH * 0.01;
        translateYValue = -SCREEN_HEIGHT * 0.14;
        break;
      case 3:
        translateXValue = -SCREEN_WIDTH * 0.2;
        translateYValue = SCREEN_HEIGHT * 0.1;
        break;
      // Add more cases as necessary
      default:
        break;
    }

    // if (index === 0) {
    //   width = SCREEN_WIDTH * 1.2;
    //   height = SCREEN_WIDTH * 1.2;
    // } else if (index === 1) {
    //   width = SCREEN_WIDTH * 1.2;
    //   height = SCREEN_WIDTH * 1.2;
    // } else if (index === 2) {
    //   width = SCREEN_WIDTH * 1.3;
    //   height = SCREEN_WIDTH * 1.3;
    // } else if (index === 3) {
    //   width = SCREEN_WIDTH * 1.2;
    //   height = SCREEN_WIDTH * 1.2;
    // }
    if (index === 0) {
      width = SCREEN_WIDTH * 1.9;
      height = SCREEN_WIDTH * 1.9;
    } else if (index === 1) {
      width = SCREEN_WIDTH * 2.3;
      height = SCREEN_WIDTH * 2.3;
    } else if (index === 2) {
      width = SCREEN_WIDTH * 1.85;
      height = SCREEN_WIDTH * 1.85;
    } else if (index === 3) {
      width = SCREEN_WIDTH * 1.75;
      height = SCREEN_WIDTH * 1.75;
    }

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [300, 150, 300],
      Extrapolate.CLAMP
    );

    return {
      width: width, // Size can be adjusted as needed
      height: height, // Assuming square image, adjust as needed
      opacity: opacityAnimation,
      transform: [
        { translateY: translateYAnimation },
        { translateX: translateXValue },
        { translateY: translateYValue },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: SCREEN_WIDTH,
      }}
    >
      <Image source={item.background} style={styles.backgroundImage} />
      <Animated.View
        style={[
          imageAnimatedStyle,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Image source={item.image} style={styles.image} />
      </Animated.View>
    </View>
    // <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
    //   <Image source={item.background} style={styles.backgroundImage} />
    //   <Image source={item.image} style={imageAnimatedStyle} />
    // </View>
  );
};

export function Welcome({ onPastWelcome }) {
  const theme = useTheme();
  useEffect(() => {
    const preloadImages = async () => {
      const images = [
        require("@assets/images/onboardingImages/onboard1.png"),
        // ... other images
      ];

      const cacheImages = images.map((image) => {
        return Asset.fromModule(image).downloadAsync();
      });

      await Promise.all(cacheImages);
    };

    preloadImages();
  }, []);

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef<FlatList<Data>>();

  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    flatListIndex.value = viewableItems[0].index ?? 0;
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Animated.FlatList
        ref={flatListRef as any}
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <RenderItem index={index} item={item} x={x} />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <View style={styles.footerContainer}>
        <Pagination data={data} screenWidth={SCREEN_WIDTH} x={x} />

        <Button
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          onPastWelcome={onPastWelcome}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    zIndex: 2,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
    zIndex: 1,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute", // Absolute position for overlaying
    bottom: 20, // Adjust this for padding from the bottom
    left: 20,
    right: 20,
    backgroundColor: "transparent",
  },
});
