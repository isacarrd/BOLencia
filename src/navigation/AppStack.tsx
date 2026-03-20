import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './index';

// Importe suas telas aqui (certifique-se de que os caminhos estão corretos)
import HomeScreen from '../screens/app/Home';
// Por enquanto, vou comentar as que você ainda não criou para não dar erro de compilação
// import AddBoletoScreen from "../screens/app/AddBoleto";
// import CameraLeitorScreen from "../screens/app/CameraLeitor";
// import DetalhesBoletoScreen from "../screens/app/DetalhesBoleto";
// import PerfilScreen from "../screens/app/Perfil";

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Esconde a barra de topo padrão
        contentStyle: { backgroundColor: '#000' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* Quando criar as outras telas, é só descomentar abaixo.
          Lembre-se: o nome no 'name' deve ser IGUAL ao definido no AppStackParamList 
      */}
      {/* <Stack.Screen name="AddBoleto" component={AddBoletoScreen} /> */}
      {/* <Stack.Screen name="CameraLeitor" component={CameraLeitorScreen} /> */}
      {/* <Stack.Screen name="DetalhesBoleto" component={DetalhesBoletoScreen} /> */}
      {/* <Stack.Screen name="Perfil" component={PerfilScreen} /> */}
    </Stack.Navigator>
  );
}
