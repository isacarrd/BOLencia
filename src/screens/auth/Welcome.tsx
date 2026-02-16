import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/ui/Buttons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
type Props = { navigation: WelcomeScreenNavigationProp };

export default function WelcomeScreen({ navigation}: Props) {
  return (
    // SafeAreaView evita que o conteúdo fique embaixo da barra de status
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // Usamos contentContainerStyle para o padding e alinhamento interno
        contentContainerStyle={styles.mainContent}
      >
        {/* Mensagem de Boas Vindas */}
        <View style={styles.boasVindas}>
          <Image
            source={require('../../assets/images/icone-150-145.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.textoIntro}>Seja bem-vindo(a) ao BOlência!</Text>
        </View>

        {/* Aqui entrarão seus botões de Login/Cadastro depois */}
        <View style={styles.botoesArea}>
          <CustomButton
            title="Entrar"
            type="filled"
            onPress={() => navigation.navigate('Login')}
          />
          <CustomButton
            title="Cadastrar-se"
            type="outlined"
            onPress={() => {
              // Navegação para a tela de Cadastro
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
    width: 150,
    height: 145,
    marginBottom: 28,
  },
  textoIntro: {
    color: theme.colors.roxoSecundario,
    fontSize: theme.size.mdX,
    fontFamily: theme.fonts.bold,
    textAlign: 'center',
  },
  botoesArea: {
    width: '100%',
    marginTop: 20,
  },
});
