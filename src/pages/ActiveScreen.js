import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

const ActiveScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Active Friends",
      headerStyle: { backgroundColor: "#FFA500" },
      headerTitleStyle: { color: "black" },
    });
  }, []);
  return (
    <SafeAreaView>
      <Text>HEHEH SIUUUU</Text>
    </SafeAreaView>
  );
};

export default ActiveScreen;

const styles = StyleSheet.create({});
