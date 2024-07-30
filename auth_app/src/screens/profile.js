import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { auth } from "../config/firebase";
import { AuthenticatedUserContext } from "../contexts";


export default function Profile({navigation}) {
  const { user } = useContext(AuthenticatedUserContext);

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "";
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user.photoURL ? (
        <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
      ) : (
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>
            {getInitials(user.displayName)}
          </Text>
        </View>
      )}
      <View style={styles.userInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.displayName}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  initialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  initialsText: {
    fontSize: 40,
    color: "#fff",
  },
  userInfo: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#E53935",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});