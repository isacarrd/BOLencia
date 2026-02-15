import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* import LoginScreen from '../screens/auth/Login'; */
import RegisterScreen from '../screens/auth/Register';
import WelcomeScreen from '../screens/auth/Welcome';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    
      {/* A tela que ficar no topo será a inicial por padrão */}
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
    </Stack.Navigator>
  );
}
