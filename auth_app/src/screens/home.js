import React from 'react';
import { TouchableOpacity, StatusBar, Platform } from 'react-native';
import { createBox, createText, ThemeProvider } from '@shopify/restyle';
import theme from '../styles/theme'; // Make sure to adjust the path as necessary

// Define Box and Text using restyle
const Box = createBox();
const Text = createText();

export default function Home({ navigation }) {
  return (
    <ThemeProvider theme={theme}>
      <Box flex={1} justifyContent="center" alignItems="center" backgroundColor="mainBackground">
        <Text variant="header" mb="m">
          Welcome to Home Screen
        </Text>
        <TouchableOpacity
          style={[
            {
              backgroundColor: theme.colors.buttonbackground,
              padding: theme.spacing.m,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: theme.spacing.m,
            }
          ]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text variant="buttonText">Go to Profile</Text>
        </TouchableOpacity>
        <StatusBar barStyle="dark-content" />
      </Box>
    </ThemeProvider>
  );
}
