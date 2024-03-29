module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      "nativewind/babel",
      require.resolve("expo-router/babel"),
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@components": "./components",
            "@lib": "./lib",
            "@app": "./app",
          },
        },
      ],
    ],
  };
};
