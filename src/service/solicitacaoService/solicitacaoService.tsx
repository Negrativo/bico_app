import { AxiosResponse } from "axios";
import { ServicoDoUsuarioDTO } from "../../dtos/ServicoDoUsuarioDTO";
import { SolicitacaoDTO } from "../../dtos/SolicitacaoDTO";
import Toast from 'react-native-toast-message';
import api from "../api";

export async function solicitarServico(solicitacaoDTO: SolicitacaoDTO): Promise<Boolean> {
  try {
    await api.post('/solicitacao/solicitar', solicitacaoDTO);
    Toast.show({
      type: 'success',
      text1: 'Solicitação realizada com sucesso!',
      visibilityTime: 8000,
    });
    return true
  } catch (error: any) {
    const detail = error?.response?.data?.message || error?.response?.data || '';
    Toast.show({
      type: 'error',
      text1: 'Erro ao solicitar profissional',
      text2: typeof detail === 'string' && detail
        ? detail
        : 'Verifique se todos os dados estão corretos ou se há conexão com internet.',
      visibilityTime: 8000,
    });
    return false
  }
}

export async function getSolicitacoesDoPrestador(usuarioId: string): Promise<ServicoDoUsuarioDTO[]> {
  return await api.get<ServicoDoUsuarioDTO[]>(`/solicitacao/prestador/${usuarioId}`)
    .then((response: AxiosResponse<ServicoDoUsuarioDTO[]>) => response.data)
    .catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar solicitações',
        text2: 'Verifique se há conexão com internet.',
        visibilityTime: 8000,
      });
      throw new Error(`/solicitacao/prestador/${usuarioId} - ` + error);
    });
}

export async function getSolicitacoesDoCliente(usuarioId: string): Promise<ServicoDoUsuarioDTO[]> {
  return await api.get<ServicoDoUsuarioDTO[]>(`/solicitacao/cliente/${usuarioId}`)
    .then((response: AxiosResponse<ServicoDoUsuarioDTO[]>) => response.data)
    .catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar minhas solicitações',
        text2: 'Verifique se há conexão com internet.',
        visibilityTime: 8000,
      });
      throw new Error(`/solicitacao/cliente/${usuarioId} - ` + error);
    });
}

/** @deprecated use getSolicitacoesDoPrestador */
export const getSolicitacoesByUsuario = getSolicitacoesDoPrestador;

async function transicaoStatus(id: string, acao: 'aceitar' | 'recusar' | 'concluir' | 'cancelar'): Promise<ServicoDoUsuarioDTO | null> {
  try {
    const response = await api.patch<ServicoDoUsuarioDTO>(`/solicitacao/${id}/${acao}`);
    return response.data;
  } catch (error: any) {
    const detail = error?.response?.data?.message || '';
    Toast.show({
      type: 'error',
      text1: `Erro ao ${acao} solicitação`,
      text2: detail || 'Tente novamente em instantes.',
      visibilityTime: 6000,
    });
    return null;
  }
}

export const aceitarSolicitacao = (id: string) => transicaoStatus(id, 'aceitar');
export const recusarSolicitacao = (id: string) => transicaoStatus(id, 'recusar');
export const concluirSolicitacao = (id: string) => transicaoStatus(id, 'concluir');
export const cancelarSolicitacao = (id: string) => transicaoStatus(id, 'cancelar');