import React, { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { supabase } from '../services/supabase';
import { View, ActivityIndicator } from 'react-native';
import AuthStack from './AuthStack';
/* import AppStack from './AppStack' */

export type AuthStackParamList = {
  Welcome: undefined;
  Recover: undefined;
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  AddBoleto: undefined;
  CameraLeitor: undefined;
  DetalhesBoleto: { id: string }; // exemplo com parâmetro
  Home: undefined;
  Perfil: undefined;
};

export default function Routes() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {' '}
        <ActivityIndicator size="large" color="#2563eb" />{' '}
      </View>
    );
  }
  return (
    <NavigationContainer theme={DefaultTheme}>
      {/* {user ? <AppStack /> : <AuthStack />} */}
      <AuthStack/>
    </NavigationContainer>
  );
}
