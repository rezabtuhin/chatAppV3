import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Card, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
const AddChatScreen = ({ navigation }) => {
  const [chatName, setChatName] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Chats",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const createChat = async () => {
    await addDoc(collection(db, "chats"), {
      chatName: chatName,
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.cardContent}>
        <Input
          placeholder="Enter chat name"
          value={Input}
          onChangeText={(text) => setChatName(text)}
          leftIcon={
            <Ionicons
              name="ios-chatbox-ellipses-sharp"
              size={24}
              color="black"
            />
          }
          style={styles.inputT}
        />
        <Button
          disabled={!chatName}
          onPress={createChat}
          title="Create new chat"
          style={styles.inputB}
          buttonStyle={{ backgroundColor: "#FFA500" }}
        />
      </Card>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
