import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, StatusBar, Alert, Platform, TouchableOpacity,StyleSheet,TextInput } from 'react-native';
import { createBox, createText, ThemeProvider } from '@shopify/restyle';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import theme from '../styles/theme';

// Define Box and Text using restyle
const Box = createBox();
const Text = createText();

const BACKGROUND_IMAGE_URL = Platform.OS === 'web' ? 'https://picsum.photos/1000' : 'https://picsum.photos/600';

export default function Signup({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(database, 'users', user.uid);
      await setDoc(userRef, {
        displayName: name,
        email: email,
        uid: user.uid,
        phoneNumber: '',
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box flex={1}>
        <ImageBackground source={{ uri: BACKGROUND_IMAGE_URL }} style={{ flex: 1 }}>
          <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SafeAreaView style={{ width: '80%' }}>
              {/* Input Fields */}
              <Box mb="m">
                <TextInput
                  style={styles.input}
                  placeholder="Enter name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="name"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </Box>
              <Box mb="m">
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
              </Box>
              <Box mb="m">
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
              </Box>
              <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
                <Text variant="buttonText">Sign Up</Text>
              </TouchableOpacity>
              <Box flexDirection="row" alignItems="center" justifyContent="center" mt="m">
                <Text variant="body" color="gray">
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text variant="body" color="buttonbackground">
                    Log In
                  </Text>
                </TouchableOpacity>
              </Box>
            </SafeAreaView>
          </Box>
        </ImageBackground>
        <StatusBar barStyle="light-content" />
      </Box>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
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
