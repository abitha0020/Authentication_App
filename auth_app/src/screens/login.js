import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Platform, StyleSheet, ImageBackground } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { ThemeProvider, createBox, createText } from '@shopify/restyle';
import theme from '../styles/theme';

const Box = createBox();
const Text = createText();

const BACKGROUND_IMAGE_URL = Platform.OS === 'web' ? 'https://picsum.photos/1000' : 'https://picsum.photos/600';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Login success'))
        .catch((err) => Alert.alert('Login error', err.message));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box flex={1}>
        <ImageBackground 
          source={{ uri: BACKGROUND_IMAGE_URL }} 
          style={styles.backgroundImage}
        >
          <SafeAreaView style={styles.safeArea}>
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
              secureTextEntry={true}
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
              <Text variant="buttonText">Log In</Text>
            </TouchableOpacity>
            <Box flexDirection="row" alignItems="center" alignSelf="center" mt="m">
              <Text color="gray" fontWeight="600" fontSize={14}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text color="buttonbackground">Sign Up</Text>
              </TouchableOpacity>
            </Box>
          </SafeAreaView>
        </ImageBackground>
        <StatusBar barStyle="light-content" />
      </Box>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  safeArea: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.buttonbackground,
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
