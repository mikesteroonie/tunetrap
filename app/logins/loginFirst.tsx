import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Welcome } from "./welcome/Welcome";

const LoginScreen = ({ onPastWelcome }) => {
  return (
    <View style={{ flex: 1 }}>
      <Welcome onPastWelcome={onPastWelcome} />
      {/* <View className="text-center w-60 h-30 bg-orange-400 p-3 rounded-lg">
        <Text className="font-bold text-lg text-red-500">disregard.</Text>
      </View>
      <TouchableOpacity onPress={onLogin}>
        <Text className="text-center w-48 bg-violet-400 text-md p-2">
          Authenticate
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default LoginScreen;
