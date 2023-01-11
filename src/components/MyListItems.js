import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
const MyListItems = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setChatMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  });
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages[chatMessages.length - 1]?.data.photoURL ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "700" }}>
          {chatName}
        </ListItem.Title>
        <Text numberOfLines={1}>
          {chatMessages[0] ? (
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
              {chatMessages[chatMessages.length - 1]?.data.displayName}:{" "}
              {chatMessages[chatMessages.length - 1]?.data.message}
            </ListItem.Subtitle>
          ) : (
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
              No conversation yet.
            </ListItem.Subtitle>
          )}
        </Text>
        {/* <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages[chatMessages.length - 1]?.data.displayName}:{" "}
          {chatMessages[chatMessages.length - 1]?.data.message}
        </ListItem.Subtitle> */}
      </ListItem.Content>
    </ListItem>
  );
};

export default MyListItems;

const styles = StyleSheet.create({});
