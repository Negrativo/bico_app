import { StatusSolicitacao } from '../../dtos/ServicoDoUsuarioDTO';

export interface SolicitacaoServicoProps {
  usuarioSolicitante: string;
  usuarioPrestador?: string | null;
  servico: string;
  diaSelecionado: string;
  horarioSolicitado: string;
  observacao: string;
  endereco: string;
  status: StatusSolicitacao;
  /** 'prestador' mostra Aceitar/Recusar/Concluir; 'cliente' mostra Cancelar. */
  modo?: 'prestador' | 'cliente';
  onPressAceite?: () => void;
  onPressRecusar?: () => void;
  onPressConcluir?: () => void;
  onPressCancelar?: () => void;
}