import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./index";
import HomeScreen from "../screens/app/Home";

const App = createNativeStackNavigator<AppStackParamList>();

/* export function AppStack() {
  return (
    <App.Navigator>
      <App.Screen name="Home" component={HomeScreen}>
      <App.Screen name="AddBoleto" component={AddBoletoScreen}>
      <App.Screen name="CameraLeitor" component={CameraLeitorScreen}>
      <App.Screen name="DetalhesBoleto" component={DetalhesBoletoScreen}>
      <App.Screen name="Perfil" component={PerfilScreen}>
    </App.Navigator>
  );
} */
