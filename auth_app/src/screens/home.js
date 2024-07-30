import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
  } from "react-native";
  
export default function Home({navigation}){
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to Home Screen</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.buttonText}>Go to Profile</Text>
          </TouchableOpacity>
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    welcome: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#f57c00",
      padding: 15,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 18,
    },
  });