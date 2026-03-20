import { supabase } from "./supabase";

// Você pode tipar os dados que chegam aqui para ficar bem organizado
interface RegisterData {
  nome: string;
  data_nascimento: string;
  email: string;
  senha: string;
  nome_fantasia: string;
  cnpj: string;
  natureza_juridica: string;
}

export const authService = {
  // Função que lida apenas com o Login
  async login(email: string, senha: string) {
    // Retornamos a promessa diretamente. Quem chamar essa função vai lidar com o erro.
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      throw error; // Lança o erro para a tela capturar
    }

    return data;
  },

  // Você pode adicionar outras funções aqui futuramente (logout, resetPassword, etc.)
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async register(data: RegisterData) {
    // 1. Cria o usuário no Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.senha,
      options: {
        data: {
          full_name: data.nome,
          data_nascimento: data.data_nascimento,
        },
      },
    });

    if (authError) throw authError;

    // 2. Salva a empresa atrelada a esse usuário
    if (authData.user) {
      // No auth.ts, dentro da função register:
      const { error: dbError } = await supabase.from('empresas').insert({
        id_usuario: authData.user.id,
        nome_fantasia: data.nome_fantasia,
        cnpj: data.cnpj.replace(/\D/g, ''),
        natureza_juridica: data.natureza_juridica,
      } as any);

      // Se o CNPJ for duplicado, o banco vai reclamar aqui
      if (dbError) {
        // Opcional: Se der erro na empresa (ex: CNPJ duplicado),
        // idealmente você deletaria o usuário criado no Auth para não ficar "órfão".
        throw dbError;
      }
    }

    return authData;
  },
};