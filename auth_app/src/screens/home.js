import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
  } from "react-native";
  
export default function Home({navigation}){
    return(
        <View>
            <Text>Welcome to Home Screen</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
            >
                <Text >Go to Profile</Text>
            </TouchableOpacity>
        </View>
    );
}