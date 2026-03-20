import React, { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { supabase } from '../services/supabase';
import { Session } from '@supabase/supabase-js';
import { View, ActivityIndicator, Text } from 'react-native';
import AuthStack from './AuthStack';
import AppStack from './AppStack'
import { theme } from '../theme';

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
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Pega a sessão inicial (local storage/MMKV)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Escuta mudanças (Login/Logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.preto,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.roxoSecundario} />
      </View>
    );
  }
return (
  <NavigationContainer theme={DefaultTheme}>
    {session ? <AuthStack /> : <AppStack />}
  </NavigationContainer>
);
}
