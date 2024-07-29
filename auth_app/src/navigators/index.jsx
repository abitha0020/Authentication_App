import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/signup';
import Login from '../screens/login';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}