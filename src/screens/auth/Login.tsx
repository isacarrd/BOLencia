import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/forms/Input';
import CustomButton from '../../components/ui/Buttons';
import { AuthStackParamList } from '../../navigation';
import { theme } from '../../theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;
type Props = { navigation: LoginScreenNavigationProp };

export default function LoginScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainContent}
      >
        <View style={styles.boasVindas}>
          <Image
            source={require('../../assets/images/icone-150-145.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.textoIntro}> Bem-vindo(a) de volta! </Text>
        </View>
        <View style={styles.formulario}>
          <View style={styles.camposFormulario}>
            <CustomInput
              placeholder="Insira seu email"
              type="filled"
              structure="email"
              onChangeText={text => {
                // Lógica para atualizar o estado do email
              }}
            />
            <CustomInput
              placeholder="Insira sua senha"
              type="filled"
              structure="password"
              onChangeText={text => {
                // Lógica para atualizar o estado do email
              }}
            />
          </View>
          <CustomButton
            title="Login"
            type="filled"
            onPress={() => {
              // Lógica de validação
            }}
          />
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
    paddingVertical: 12
  },
  camposFormulario: {
    gap: 8
  }
});
