import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Card } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "login",
    });
  }, [navigation]);

  const register = async (e) => {
    if (name.length == 0 && email.length == 0 && password.length == 0) {
      alert("Fields cannot be empty");
    } else {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: name,
        photoURL:
          imageURL ||
          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      });
      console.log("User profile updated");
    }
  };

  // const register = async (e) => {
  //   await createUserWithEmailAndPassword(auth, email, password)
  //     .then((authUser) => {
  //       authUser.user.updateProfile({
  //         displayName: name,
  //         photoURL:
  //           imageURL ||
  //           "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
  //       });
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
            placeholder="Full name"
            type="text"
            value={name}
            onChangeText={(text) => setName(text)}
            leftIcon={<AntDesign name="user" size={22} color="black" />}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            leftIcon={<Ionicons name="mail-outline" size={22} color="black" />}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            leftIcon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={22}
                color="black"
              />
            }
          />
          <Input
            placeholder="Image URL"
            type="text"
            value={imageURL}
            onChangeText={(text) => setImageURL(text)}
            leftIcon={<Ionicons name="image-outline" size={22} color="black" />}
            onSubmitEditing={register}
          />
        </View>
        <Button
          disabled={!name || !email || !password}
          containerStyle={styles.button}
          onPress={register}
          title="Sign Up"
          buttonStyle={{ backgroundColor: "#FFA500" }}
        />
        <Button
          containerStyle={styles.buttonSignup}
          title="Already a member? Login"
          type="clear"
          onPress={() => navigation.goBack()}
          titleStyle={{ color: "#FFA500" }}
        />
      </Card>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 120,
    height: 120,
  },
  touchablebutton: {
    color: "#FFA500",
  },
  inputContainer: {
    width: 300,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoPosition: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSignup: {
    marginTop: 5,
  },
});
