import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';


interface BotaoProps {
  titulo: string;
  aoPressionar: () => void;
  corDeFundo?: string;
  corDeBorda?: string;
}

const MeuBotao = ({
  titulo,
  aoPressionar,
  corDeFundo = '#007BFF',
}: BotaoProps) => {
  return (
    <TouchableOpacity
      style={[]}
      onPress={aoPressionar}
      activeOpacity={0.7}
    >
      <Text ></Text>
    </TouchableOpacity>
  );
};

export default MeuBotao;
