import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground,SafeAreaView,StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebase";
import profile from "../assets/favicon.png";
import { Platform } from "react-native";
import { doc, setDoc } from "firebase/firestore";

const BACKGROUND_IMAGE_URL = Platform.OS==='web'?"https://picsum.photos/1000":"https://picsum.photos/600"

export default function Signup({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleSignup = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const userRef = doc(database, "users", user.uid);
          await setDoc(userRef, {
            displayName: name,
            email: email,
            uid: user.uid,
            phoneNumber: "",
          });
        } catch (error) {
          Alert.alert(error.message);
        }
      };
      return (
        <View style={styles.container}>
          <ImageBackground source={{uri:BACKGROUND_IMAGE_URL}}style={styles.backImage} />
          <View />
          <SafeAreaView style={styles.form}>
            {/* Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              showSoftInputOnFocus={false}
              secureTextEntry={true}
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>Sign Up</Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}>Log In</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          {/* StatusBar */}
          <StatusBar barStyle="light-content" />
        </View>
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      backImage: {
        flex: 1,
      },
      overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
      form: {
        width: "80%",
      },
      input: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
      },
      button: {
        backgroundColor: "#f57c00",
        padding: 15,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      },
      navigation: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
      },
      text: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
      },
      linkText: {
        color: "#f57c00",
        fontWeight: "600",
        fontSize: 14,
      },
    });    