import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    // SafeAreaView evita que o conteúdo fique embaixo da barra de status
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // Usamos contentContainerStyle para o padding e alinhamento interno
        contentContainerStyle={styles.scrollContent}
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
          {/* Espaço reservado para os botões */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.preto,
  },
  scrollContent: {
    padding: theme.spacing.wPadrao,
    alignItems: 'center', 
    paddingTop: 60, 
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
