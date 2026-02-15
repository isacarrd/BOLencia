import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HomeScreen() {
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
          <Text style={styles.headerTitle}>Olá, Empreendedor!</Text>
          <View style={styles.profilePlaceholder} />
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
                {/* Lógica de cor condicional */}
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
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profilePlaceholder: {
    width: 32,
    height: 32,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
  },
  balanceLabel: {
    color: '#dbeafe',
    fontSize: 14,
  },
  balanceValue: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  listTitle: {
    color: '#1f2937',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardName: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: 16,
  },
  cardDate: {
    color: '#6b7280',
  },
  dateAlert: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  cardValue: {
    fontWeight: 'bold',
    color: '#1f2937',
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: '#2563eb',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabIcon: {
    color: '#ffffff',
    fontSize: 30,
    paddingBottom: 4,
  },
});
