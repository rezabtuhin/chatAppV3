import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import MyListItems from "../components/MyListItems";
import { db } from "../../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const ChatScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate("Conversations", {
      id,
      chatName,
    });
  };
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <MyListItems
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
