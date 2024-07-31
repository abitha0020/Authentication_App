import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { AuthenticatedUserContext } from '../contexts';
import { doc, getDoc } from 'firebase/firestore';
import { createBox, createText, ThemeProvider } from '@shopify/restyle';
import theme from '../styles/theme'; // Adjust the path as necessary

// Define Box and Text using restyle
const Box = createBox();
const Text = createText();

export default function Profile({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out');
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error('Error logging out: ', error);
      });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box flex={1} justifyContent="center" alignItems="center" backgroundColor="mainBackground">
          <ActivityIndicator size="large" color="primary" />
          <Text variant="body" mt="m">Loading...</Text>
        </Box>
      </ThemeProvider>
    );
  }

  if (!userData) {
    return (
      <ThemeProvider theme={theme}>
        <Box flex={1} justifyContent="center" alignItems="center" backgroundColor="mainBackground">
          <Text variant="body">No user data found.</Text>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.m }}>
        <Text variant="header" mb="l">Profile</Text>
        <Box width="80%" mb="m" backgroundColor="buttonText" padding="m" borderRadius={10} 
          shadowColor="primaryText" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={0.25} shadowRadius={4} elevation={5}>
          <Text variant="body" fontWeight="bold" color="primaryText">Name:</Text>
          <Text variant="body" color="primaryText" mb="s">{userData.displayName}</Text>
          <Text variant="body" fontWeight="bold" color="primaryText">Email:</Text>
          <Text variant="body" color="primaryText">{userData.email}</Text>
        </Box>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.buttonbackground,
            padding: theme.spacing.m,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.spacing.l,
            width: '60%',
          }}
          onPress={handleLogout}
        >
          <Text variant="buttonText">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemeProvider>
  );
}
