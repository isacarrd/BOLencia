import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../../theme';

// Tipos possíveis de input
// NOS DEMAIS INPUTS SERÃO TIPO DEFAULT POIS NÃO TERÃO IMAGENS
type InputType = 'email' | 'password' | 'default';

type Props = {
  label?: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  type?: 'filled' | 'outlined';
  placeholderTextColor?: 'bolder' | 'italico';
  structure?: InputType; // define o tipo do campo
};

const CustomInput: React.FC<Props> = ({
  label,
  placeholder,
  onChangeText,
  type = 'filled',
  placeholderTextColor = 'bolder',
  structure = 'default',
}) => {
  // Escolhe o ícone conforme o tipo
  const getIcon = () => {
    switch (structure) {
      case 'email':
        return require('../../assets/images/email-ic.png');
      case 'password':
        return require('../../assets/images/senha-ic.png');
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.input,
          type === 'filled' ? styles.filled : styles.outlined,
        ]}
      >
        {getIcon() && <Image source={getIcon()} style={styles.icon} />}
        <TextInput
          style={[
            placeholderTextColor === 'bolder'
              ? styles.textBold
              : styles.textItalic,
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.branco}
          onChangeText={onChangeText}
          secureTextEntry={structure === 'password'} // ativa ocultar texto se for senha
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: theme.colors.branco,
    fontFamily: theme.fonts.bold,
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: theme.colors.branco, // aplica cor ao ícone
  },
  input: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 25,
    paddingVertical: 14,

    color: theme.colors.branco,
  },
  filled: {
    borderRadius: 70,
    backgroundColor: theme.colors.roxoEscuro,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.amarelo,
    borderRadius: 8,
  },
  textBold: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.size.mdX,
  },
  textItalic: {
    fontFamily: theme.fonts.italic,
    fontSize: theme.size.smX,
  },
});

export default CustomInput;
