import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/pages/LoginScreen";
import RegisterScreen from "./src/pages/RegisterScreen";
import HomeScreen from "./src/pages/HomeScreen";
import AddChatScreen from "./src/pages/AddChatScreen";
import ConvoScreen from "./src/pages/ConvoScreen";

const AuthStack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#FFA500" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
  headerTitleAlign: "center",
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={globalScreenOptions}>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "LogIn" }}
        />
        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "SignUp" }}
        />
        <AuthStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home", headerShown: false }}
        />
        <AuthStack.Screen
          name="AddChatScreen"
          component={AddChatScreen}
          options={{ title: "Create New Chat", headerTitleAlign: "left" }}
        />
        <AuthStack.Screen name="Conversations" component={ConvoScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
