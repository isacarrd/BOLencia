import React, { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { supabase } from '../services/supabase';
import AuthStack from './AuthStack';
/* import AppStack from './AppStack';  */
import { View, ActivityIndicator } from 'react-native';

export default function Routes() {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se já existe uma sessão ativa ao abrir o app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escuta mudanças: se logar ou deslogar, o estado 'user' atualiza
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
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Lógica de Direcionamento */}
      <AuthStack/>
      {/* {user ? <AppStack /> : <AuthStack />} */}
    </NavigationContainer>
  );
}
