import { AxiosResponse } from "axios";
import { UsuarioEmailDTO } from "../../dtos/UsuarioEmailDTO";
import { UsuarioEmailSenhaDTO } from "../../dtos/UsuarioEmailSenhaDTO";
import { UsuarioDTO as Usuario } from "../../dtos/UsuarioDTO";
import Toast from 'react-native-toast-message';
import api from "../api";

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export async function login(email: string, senha: string): Promise<LoginResponse | null> {
  const usuarioLogin = { email, senha } as UsuarioEmailSenhaDTO;

  try {
    const response = await api.post<LoginResponse>(`/auth/login`, usuarioLogin);
    return response.data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro ao fazer Login',
      text2: 'Verifique se todos os dados estão corretos ou se há conexão com internet.',
      visibilityTime: 8000,
    });

    return null;
  }
}

export async function verificarUsuarioExistente(emailUsuario: string): Promise<Boolean> {
  const data = { email: emailUsuario } as unknown as UsuarioEmailDTO;
  return await api.post<Boolean>('/auth/email-existente', data)
    .then((response: AxiosResponse<Boolean>) => {
      return response.data;
    })
    .catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'Erro ao verificar dados de usuário',
        text2: 'Verifique se há conexão com internet.',
        visibilityTime: 8000,
      });
      throw new Error(error);
    });
}