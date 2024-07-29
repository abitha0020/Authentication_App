import 'react-native-gesture-handler';
import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/config/firebase";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticatedUserContext } from "./src/contexts";
import { StatusBar } from "react-native";
import Signup from './src/screens/signup';
import Login from "./src/screens/login";
import Home from './src/screens/home';
import { Platform } from 'react-native';

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootComponent />
    </AuthenticatedUserProvider>
  );
}

const RootComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          await authenticatedUser.reload();
          setUser(authenticatedUser);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );
    return unsubscribeAuth; 
  }, [setUser]);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
};

const MainNavigator = () => {
  const { user } = useContext(AuthenticatedUserContext);
  return user ? <AppStack /> : <AuthStack />;
};

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};



const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home"   component={Home} />
    </Stack.Navigator>
  );
};
