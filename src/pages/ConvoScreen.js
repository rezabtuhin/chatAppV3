import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import {
  doc,
  serverTimestamp,
  setDoc,
  onSnapshot,
  addDoc,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { async } from "@firebase/util";

const ConvoScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri:
                messages[messages.length - 1]?.data.photoURL ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
            }}
          />
          <Text style={{ marginStart: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 60,
            marginRight: 25,
          }}
        >
          <TouchableOpacity>
            <Feather name="video" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="phone-call" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);
  const sendMessage = async () => {
    await addDoc(
      collection(db, "chats", route.params.id, "messages"),
      {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      },
      { merge: true }
    );
    setInput("");
  };

  useLayoutEffect(() => {
    const q = query(
      collection(db, "chats", route.params.id, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, [route]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.reciever}>
                  <Avatar
                    position="absolute"
                    size={30}
                    bottom={-15}
                    right={-5}
                    rounded
                    source={{
                      uri: data.photoURL,
                    }}
                  />
                  <Text style={styles.recieverText}>{data.message}</Text>
                </View>
              ) : (
                <View style={styles.sender}>
                  <Avatar
                    position="absolute"
                    size={30}
                    bottom={-15}
                    left={-5}
                    rounded
                    source={{
                      uri: data.photoURL,
                    }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      position: "absolute",
                      top: -12,
                      left: 15,
                      color: "#65676b",
                    }}
                  >
                    {data.displayName}
                  </Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="Message"
              style={styles.textInput}
              value={input}
              onChangeText={(text) => setInput(text)}
            />
            <TouchableOpacity
              onPress={sendMessage}
              activeOpacity={0.5}
              style={{
                marginRight: 5,
              }}
            >
              <FontAwesome name="send" size={24} color="#FFA500" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConvoScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  recieverText: {
    fontWeight: "500",
  },
  senderText: {
    fontWeight: "500",
    color: "white",
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#FFA500",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 10,
    maxWidth: "80%",
    position: "relative",
  },
});
