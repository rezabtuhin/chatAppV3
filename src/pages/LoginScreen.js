import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input, Card } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signin = () => {
    if (email && password) {
      const fireAuth = getAuth();
      signInWithEmailAndPassword(fireAuth, email, password)
        .then((userCreds) => {
          console.log(userCreds.email);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <StatusBar style="light" />
      <Card style={styles.card}>
        <View style={styles.logoPosition}>
          <Image
            source={require("../../assets/fish_logo.png")}
            style={styles.tinyLogo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            leftIcon={<Ionicons name="mail-outline" size={22} color="black" />}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            leftIcon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={22}
                color="black"
              />
            }
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button
          disabled={!email || !password}
          containerStyle={styles.button}
          onPress={signin}
          title="Login"
          buttonStyle={{ backgroundColor: "#FFA500" }}
        />
        <Button
          containerStyle={styles.buttonSignup}
          title="Create new account"
          type="clear"
          onPress={() => navigation.navigate("Register")}
          titleStyle={{ color: "#FFA500" }}
        />
      </Card>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 120,
    height: 120,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    color: "#FFA500",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  touchablebutton: {
    color: "#FFA500",
  },
  logoPosition: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSignup: {
    color: "yellow",
    marginTop: 5,
  },
});
