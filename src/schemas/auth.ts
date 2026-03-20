import { z } from 'zod';
import { validarCNPJ } from '../utils/mask'; // Ajuste o path conforme sua estrutura

export const loginSchema = z.object({
  email: z
    .email('Insira um email válido!')
    .min(1, { error: 'O email é obrigatório!' }),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const registerSchema = z
  .object({
    // USUÁRIO
    nome: z.string('Insira seu nome.').min(3, 'Nome muito curto.'),

    data_nascimento: z
      .string('Insira sua Data de Nascimento.')
      .min(10, 'Data incompleta.')
      // 1ª Refinamento: Verifica se é uma data real (evita 31/02 ou mês 13)
      .refine(val => {
        const [dia, mes, ano] = val.split('/').map(Number);
        const data = new Date(ano, mes - 1, dia);
        return (
          data.getDate() === dia &&
          data.getMonth() === mes - 1 &&
          data.getFullYear() === ano
        );
      }, 'Data de nascimento inválida (Verifique o dia e o mês).')
      // 2º Refinamento: Verifica se tem 18 anos ou mais
      .refine(val => {
        const [dia, mes, ano] = val.split('/').map(Number);
        const dataNasc = new Date(ano, mes - 1, dia);
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();

        // Se ainda não fez aniversário esse ano, subtrai 1 da idade
        if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
          idade--;
        }
        return idade >= 18;
      }, 'Você precisa ter pelo menos 18 anos para se cadastrar.'),

    email: z.email('E-mail inválido.'),

    senha: z
      .string('Insira uma senha.')
      .min(6, 'A senha deve ter 6+ caracteres.'),

    confirmarSenha: z.string('Campo Vazio.'),

    // EMPRESA
    nome_fantasia: z
      .string('Nome inválido.')
      .min(2, 'Informe o nome da empresa'),

    cnpj: z
      .string('Este campo não deve ficar vazio')
      .min(1, 'Este campo não deve ficar vazio')
      .length(18, 'CNPJ incompleto')
      // Refinamento: Chama a função que criamos para validar a matemática do CNPJ
      .refine(val => validarCNPJ(val), 'Este CNPJ não é válido.'),

    natureza_juridica: z
      .string('Este campo é obrigatório.')
      .min(1, 'Selecione a natureza jurídica'),
  })
  // 3. Verifica se as senhas batem (Você já tinha isso no seu código original!)
  .refine(data => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem.',
    path: ['confirmarSenha'], // O erro vai aparecer debaixo do input "Confirmar Senha"
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
