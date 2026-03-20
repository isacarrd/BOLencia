import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/forms/Input';
import CustomButton from '../../components/ui/Buttons';
import { AuthStackParamList } from '../../navigation';
import { theme } from '../../theme';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginFormData } from '../../schemas/auth';
import { authService } from '../../services/auth'; 

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;
type Props = { navigation: LoginScreenNavigationProp };

export default function LoginScreen({ navigation }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', senha: '' },
  });

const onLogin = async (data: LoginFormData) => {
  setIsSubmitting(true);
  try {
    await authService.login(data.email, data.senha);
    // O redirecionamento ocorre automaticamente pelo Routes/index.ts
  } catch (error: any) {
    Alert.alert('Erro no Login', error.message || 'Credenciais inválidas.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      {/* ... (Seu JSX continua exatamente igual, não alterei nada do visual) ... */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainContent}>
        <View style={styles.boasVindas}>
          <Image source={require('../../assets/images/icone-150-145.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.textoIntro}> Bem-vindo(a) de volta! </Text>
        </View>

        <View style={styles.formulario}>
          <View style={styles.camposFormulario}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View>
                  <CustomInput placeholder="Insira seu email" type="filled" structure="email" onChangeText={onChange} value={value} error={errors.email?.message} />
                </View>
              )}
            />
            <Controller
              control={control}
              name="senha"
              render={({ field: { onChange, value } }) => (
                <View>
                  <CustomInput placeholder="Insira sua senha" type="filled" structure="password" onChangeText={onChange} value={value} error={errors.senha?.message} />
                </View>
              )}
            />
          </View>
          <CustomButton title={isSubmitting ? 'Carregando...' : 'Login'} type="filled" onPress={handleSubmit(onLogin)} disabled={isSubmitting} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.preto,
    paddingHorizontal: theme.spacing.wPadrao,
  },
  mainContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boasVindas: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 28,
  },
  textoIntro: {
    color: theme.colors.roxoSecundario,
    fontSize: theme.size.mdX,
    fontFamily: theme.fonts.bold,
    textAlign: 'center',
  },
  formulario: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    paddingVertical: 12,
  },
  camposFormulario: {
    gap: 24,
  },
  errorText: {
    color: theme.colors.vermelhoAviso,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
