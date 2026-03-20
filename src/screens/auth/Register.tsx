import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomInput from '../../components/forms/Input';
import SelectModal from '../../components/forms/SelectModal';
import CustomButton from '../../components/ui/Buttons';
import { RegisterFormData, registerSchema } from '../../schemas/auth';
import { authService } from '../../services/auth';
import { theme } from '../../theme';
import { maskCNPJ, maskDate } from '../../utils/mask';

export default function RegisterScreen() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: '',
      data_nascimento: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      nome_fantasia: '',
      cnpj: '',
      natureza_juridica: '',
    },
  });

  const naturezasJuridicas = [
    { label: 'Empresário Individual (MEI)', value: 'mei' },
    { label: 'Sociedade Limitada (LTDA)', value: 'ltda' },
    { label: 'Sociedade Anônima (S/A)', value: 'sa' },
  ];

  const nextStep = async () => {
    const fields = [
      'nome',
      'data_nascimento',
      'email',
      'senha',
      'confirmarSenha',
    ];
    const isValid = await trigger(fields as any);
    if (isValid) setStep(2);
  };

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await authService.register(data);
      Alert.alert('Sucesso!', 'Conta e empresa cadastradas com sucesso.');
    } catch (error: any) {
      let msg = error.message;
      if (error.code === '23505') msg = 'Este CNPJ já está cadastrado.';
      Alert.alert('Erro no cadastro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          {/* <Text style={styles.progressTitle}>Estamos perto!</Text> */}
          <View style={styles.progressBar}>
            <View
              style={[styles.progress, { width: step === 1 ? '50%' : '100%' }]}
            />
          </View>
        </View>

        <View style={{ display: step === 1 ? 'flex' : 'none' }}>
          <View style={styles.section}>
            <View style={styles.textSecao}>
              <View style={styles.tituloSecao}>
                <Image
                  source={require('../../assets/images/user.png')}
                  style={styles.image}
                />
                <Text style={styles.textTitulo}>Usuário</Text>
              </View>
              <Text style={styles.subtitle}> Insira seus dados abaixo.</Text>
            </View>
            <Controller
              control={control}
              name="nome"
              render={({ field: { onChange, value } }) => (
                <View>
                  <CustomInput
                    label="Nome Completo"
                    placeholder="Ex: João da Silva"
                    placeholderTextStyle="italico"
                    type="outlined"
                    value={value}
                    onChangeText={onChange}
                    error={errors.nome?.message}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="data_nascimento"
              render={({ field: { onChange, value } }) => (
                <View>
                  <CustomInput
                    label="Data de Nascimento"
                    placeholder="Ex: 01/02/1990"
                    placeholderTextStyle="italico"
                    type="outlined"
                    value={value}
                    onChangeText={txt => onChange(maskDate(txt))}
                    keyboardType="numeric"
                    error={errors.data_nascimento?.message}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View>
                  <CustomInput
                    label="E-mail"
                    placeholder="Ex: joaosilva@gmail.com"
                    placeholderTextStyle="italico"
                    type="outlined"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    error={errors.email?.message}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="senha"
              render={({ field: { onChange, value } }) => (
                <View>
                  <CustomInput
                    label="Senha"
                    placeholder="Insira uma senha forte e memorável!"
                    placeholderTextStyle="italico"
                    type="outlined"
                    secureTextEntry={true}
                    structure="password"
                    value={value}
                    onChangeText={onChange}
                    error={errors.senha?.message}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="confirmarSenha"
              render={({ field: { onChange, value } }) => (
                <View>
                  <CustomInput
                    label="Confirmar Senha"
                    placeholder="Reescreva sua senha"
                    placeholderTextStyle="italico"
                    type="outlined"
                    secureTextEntry
                    structure="password"
                    value={value}
                    onChangeText={onChange}
                    error={errors.confirmarSenha?.message}
                  />
                </View>
              )}
            />
            <CustomButton title="Próximo" onPress={nextStep} />
          </View>
        </View>

        <View style={{ display: step === 2 ? 'flex' : 'none' }}>
          <View style={styles.section}>
            <View style={styles.textSecao}>
              <View style={styles.tituloSecao}>
                <Image
                  source={require('../../assets/images/empresa.png')}
                  style={styles.image}
                />
                <Text style={styles.textTitulo}>Empresa</Text>
              </View>
              <Text style={styles.subtitle}>
                {' '}
                Insira abaixo os dados da empresa que deseja gerenciar.
              </Text>
            </View>
            <Controller
              control={control}
              name="nome_fantasia"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Nome da Empresa"
                  placeholder="Ex: Mercearia São José"
                  placeholderTextStyle="italico"
                  type="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={errors.nome_fantasia?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="cnpj"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="CNPJ"
                  placeholder="Ex: 00.000.000/0001-00"
                  placeholderTextStyle="italico"
                  type="outlined"
                  value={value}
                  onChangeText={txt => {
                    // AQUI ESTÁ O SEGREDO: Use a função que retorna TEXTO
                    const textoFormatado = maskCNPJ(txt);
                    onChange(textoFormatado);
                  }}
                  keyboardType="numeric"
                  maxLength={18}
                  error={errors.cnpj?.message}
                />
              )}
            />
            <Text style={styles.label}>Natureza Jurídica</Text>
            <Controller
              control={control}
              name="natureza_juridica"
              render={({ field: { value, onChange } }) => (
                <>
                  <TouchableOpacity
                    style={styles.selectTrigger}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={{ color: value ? '#FFF' : '#666' }}>
                      {value
                        ? naturezasJuridicas.find(n => n.value === value)?.label
                        : 'Selecione...'}
                    </Text>
                  </TouchableOpacity>
                  {errors.natureza_juridica && (
                    <Text style={styles.errorText}>
                      {errors.natureza_juridica.message}
                    </Text>
                  )}
                  <SelectModal
                    visible={modalVisible}
                    options={naturezasJuridicas}
                    onSelect={onChange}
                    onClose={() => setModalVisible(false)}
                    title="Selecione a Natureza Jurídica"
                  />
                </>
              )}
            />
            <View style={styles.buttonRow}>
              <CustomButton
                title="Voltar"
                type="outlined"
                onPress={() => setStep(1)}
              />
              <CustomButton
                title={loading ? 'Carregando...' : 'Concluir'}
                type="filled"
                onPress={handleSubmit(
                  data => handleRegister(data), // Se estiver tudo OK
                  errors => {
                    // Se o Zod travar
                    console.log('ERROS NO ZOD:', errors);
                    Alert.alert(
                      'Campos Inválidos',
                      'Existem erros no formulário. Verifique as senhas e o CNPJ.',
                    );
                  },
                )}
                disabled={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textSecao: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginBottom: 32,
  },
  tituloSecao: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textTitulo: {
    color: theme.colors.branco,
    fontSize: theme.size.md,
    fontFamily: theme.fonts.bold,
  },
  image: {
    width: 32,
    height: 32,
  },
  subtitle: {
    color: theme.colors.branco,
    fontFamily: theme.fonts.regular,
    fontSize: theme.size.sm,
  },
  formulario: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    paddingVertical: 12,
  },
  camposFormulario: {
    gap: 24,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.preto,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 30,
  },
  progressTitle: {
    color: theme.colors.cinza,
    fontSize: theme.size.mdX,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  progress: {
    height: 6,
    backgroundColor: theme.colors.amarelo,
    borderRadius: 3,
  },
  section: {
    gap: 10,
  },
  label: {
    color: theme.colors.branco,
    fontFamily: theme.fonts.bold,
    fontSize: theme.size.sm,
    marginBottom: -5,
    marginTop: 10,
  },
  selectTrigger: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  buttonRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
  },
});
