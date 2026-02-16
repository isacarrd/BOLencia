import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* import LoginScreen from '../screens/auth/Login'; */
import RegisterScreen from '../screens/auth/Register';
import WelcomeScreen from '../screens/auth/Welcome';
import { AuthStackParamList } from './index';

const Auth = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Auth.Navigator>
      <Auth.Screen name='Welcome' component={WelcomeScreen}/>
    </Auth.Navigator>
  );
}
