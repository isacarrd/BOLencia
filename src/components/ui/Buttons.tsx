import React from 'react';
import { StyleSheet, Text, TouchableOpacity, type GestureResponderEvent } from 'react-native';
import { theme } from '../../theme';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  type?: 'filled' | 'outlined'; // tipos de botão
};

const CustomButton: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  type = 'filled' 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'filled' ? styles.filled : styles.outlined
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  filled: {
    backgroundColor: theme.colors.roxoPadrao,
  },
  outlined: {
    borderWidth: 2,
    borderColor: theme.colors.roxoPadrao,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: theme.size.mdX,
    fontFamily: theme.fonts.bold,
    color: theme.colors.branco
  },
});

export default CustomButton;
