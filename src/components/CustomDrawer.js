import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import { auth, signOut } from "../../firebase";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StatusBar } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const CustomDrawer = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.20)" animated />
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: "white" }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 15 }}
        >
          <Avatar
            size={45}
            rounded
            source={{ uri: auth?.currentUser?.photoURL }}
          />
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 23 }}>
              {" "}
              {auth?.currentUser?.displayName}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginStart: 5,
              }}
            >
              <Text style={{ marginEnd: 3 }}>Active now</Text>
              <Octicons name="dot-fill" size={15} color="#32CD32" />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopColor: "#ccc", borderTopWidth: 1 }}>
        <TouchableOpacity
          onPress={signOutUser}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="exit-outline" size={24} color="black" />
          <Text style={{ paddingStart: 8, fontSize: 16, fontWeight: "bold" }}>
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
