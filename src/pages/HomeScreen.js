import "react-native-gesture-handler";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "react-native-elements";
import { auth } from "../../firebase";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import ChatScreen from "./ChatScreen";
import CustomDrawer from "../components/CustomDrawer";
import AddChatScreen from "./AddChatScreen";
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeScreen = ({ navigation }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Chats"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          headerTitle: "Fishbook",
          headerStyle: { backgroundColor: "#FFA500" },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 60,
                marginRight: 15,
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <AntDesign name="camerao" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("AddChatScreen")}
              >
                <SimpleLineIcons name="pencil" size={20} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
