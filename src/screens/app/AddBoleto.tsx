// src/screens/app/AddBoleto.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function AddBoletoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Boleto</Text>

      {/* Código de Barras */}
      <View style={styles.section}>
        <Text style={styles.label}>Código de Barras</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="0000.0000.0000..."
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Outros Campos */}
      <View style={styles.formGroup}>
        <View>
          <Text style={styles.label}>Beneficiário (Quem recebe)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Enel, Vivo..."
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Valor</Text>
            <TextInput
              style={styles.input}
              placeholder="R$ 0,00"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Vencimento</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} activeOpacity={0.7}>
        <Text style={styles.saveButtonText}>Salvar Boleto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    color: '#4b5563',
    marginBottom: 8,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    gap: 16, // Nota: gap em row funciona nas versões RN 0.71+
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  cameraButton: {
    backgroundColor: '#1f2937',
    width: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    color: '#ffffff',
  },
  formGroup: {
    gap: 16,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
