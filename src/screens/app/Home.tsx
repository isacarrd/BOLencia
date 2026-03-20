import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { supabase } from '../../services/supabase'; // Ajuste o path
import { theme } from '../../theme'; // Ajuste o path

export default function HomeScreen() {
  const [userName, setUserName] = useState('Empreendedor');

  // 1. Buscar o nome do usuário logado
  useEffect(() => {
    async function getProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        // Pega apenas o primeiro nome para o header
        const firstName = user.user_metadata.full_name.split(' ')[0];
        setUserName(firstName);
      }
    }
    getProfile();
  }, []);

  // 2. Função de Logout
  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        onPress: async () => await supabase.auth.signOut(),
        style: 'destructive',
      },
    ]);
  };

  const boletos = [
    {
      id: '1',
      nome: 'Fornecedor Doces',
      valor: 'R$ 250,00',
      data: 'Vence Hoje',
      status: 'vencendo',
    },
    {
      id: '2',
      nome: 'Internet Fibra',
      valor: 'R$ 100,00',
      data: '20/05',
      status: 'pendente',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Olá, {userName}!</Text>

          {/* Botão de Perfil que agora faz Logout */}
          <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
            <Text style={{ fontSize: 16 }}>👤</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.balanceLabel}>Total a pagar na semana</Text>
          <Text style={styles.balanceValue}>R$ 350,00</Text>
        </View>
      </View>

      {/* Lista de Boletos */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Próximos Vencimentos</Text>

        <FlatList
          data={boletos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.cardName}>{item.nome}</Text>
                <Text
                  style={[
                    styles.cardDate,
                    item.status === 'vencendo' && styles.dateAlert,
                  ]}
                >
                  {item.data}
                </Text>
              </View>
              <Text style={styles.cardValue}>{item.valor}</Text>
            </View>
          )}
        />
      </View>

      {/* Botão Flutuante (FAB) */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.preto, // Usando seu tema
  },
  header: {
    backgroundColor: theme.colors.roxoEscuro, // Usando seu tema
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: theme.colors.branco,
    fontSize: 22,
    fontFamily: theme.fonts.bold,
  },
  profileButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.roxoSecundario,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#CCC',
    fontSize: 14,
  },
  balanceValue: {
    color: theme.colors.amarelo, // Destaque para o valor
    fontSize: 32,
    fontFamily: theme.fonts.bold,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  listTitle: {
    color: theme.colors.branco,
    fontFamily: theme.fonts.bold,
    fontSize: 18,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1A1A1A', // Card escuro para combinar com o fundo
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.roxoSecundario,
  },
  cardName: {
    color: theme.colors.branco,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  },
  cardDate: {
    color: '#999',
  },
  dateAlert: {
    color: theme.colors.vermelhoAviso,
    fontWeight: 'bold',
  },
  cardValue: {
    color: theme.colors.branco,
    fontSize: 18,
    fontFamily: theme.fonts.bold,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: theme.colors.roxoSecundario,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabIcon: {
    color: theme.colors.branco,
    fontSize: 35,
    lineHeight: 40,
  },
});
