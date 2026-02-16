import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
/* import LoginScreen from '../screens/auth/Login'; */
import LoginScreen from '../screens/auth/Login';
import WelcomeScreen from '../screens/auth/Welcome';
import { theme } from '../theme';
import { AuthStackParamList } from './index';

const Auth = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerStyle: { backgroundColor: theme.colors.preto },
          headerTintColor: theme.colors.branco,
          title: '',
        }}
      />
      <Auth.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: { backgroundColor: theme.colors.preto },
          headerTintColor: theme.colors.branco,
          title: '',
        }}
      />
    </Auth.Navigator>
  );
}
