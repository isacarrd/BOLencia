import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from 'react-native';
import { theme } from '../../theme';

// Tipos possíveis de input
// NOS DEMAIS INPUTS SERÃO TIPO DEFAULT POIS NÃO TERÃO IMAGENS
type InputType = 'email' | 'password' | 'error' | 'default';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  type?: 'filled' | 'outlined';
  placeholderTextStyle?: 'bolder' | 'italico';
  structure?: InputType;
}

const CustomInput: React.FC<Props> = ({
  label,
  placeholder,
  onChangeText,
  value,
  error,
  type = 'filled',
  placeholderTextStyle = 'bolder',
  autoCapitalize = 'none', 
  structure = 'default',
  secureTextEntry,
  ...rest // Captura qualquer outra prop (ex: keyboardType)
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  // sscolhe o ícone conforme o tipo
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

  const errorIcon = require('../../assets/images/aviso-ic-teste.png');
  const shouldHideText = structure === 'password' && !isPasswordVisible;

  const hasInputIcon = !!getIcon();
  const inputContentOffset = hasInputIcon ? 25 + 24 + 8 : 25;

  const zoioAberto = require('./../../assets/images/vendo.png')
  const zoioFechado = require('./../../assets/images/oculto.png')

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.campo}>
        <View
          style={[
            styles.input,
            type === 'filled' ? styles.filled : styles.outlined,
            error ? styles.inputError : null, // Borda vermelha se houver erro
          ]}
        >
          {getIcon() && <Image source={getIcon()} style={styles.icon} />}
          <TextInput
            style={[
              placeholderTextStyle === 'bolder'
                ? styles.textBold
                : styles.textItalic,
              {
                flex: 1,
                color: theme.colors.branco,
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.branco}
            onChangeText={onChangeText}
            value={value}
            autoCapitalize={autoCapitalize}
            secureTextEntry={shouldHideText}
          />
          {structure === 'password' && (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Image
                source={isPasswordVisible ? zoioAberto : zoioFechado}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {error ? (
        <View style={styles.errorRow}>
          <Image source={errorIcon} style={styles.errorIcon} />
          <Text style={styles.textError}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  campo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  label: {
    color: theme.colors.branco,
    fontFamily: theme.fonts.bold,
    fontSize: theme.size.sm,
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: theme.colors.branco,
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
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.amarelo,
    borderRadius: 8,
  },
  textBold: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.size.mdX,
  },
  textItalic: {
    fontFamily: theme.fonts.italic,
    fontSize: theme.size.sm,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
    marginTop: 6,
  },
  errorIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  inputError: {
    borderColor: theme.colors.vermelhoAviso,
  },
  textError: {
    color: theme.colors.vermelhoAviso,
    fontFamily: theme.fonts.regular,
    fontSize: theme.size.sm,
  },
});

export default CustomInput;
