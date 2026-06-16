export type StatusSolicitacao =
  | 'PENDENTE'
  | 'ACEITA'
  | 'RECUSADA'
  | 'CONCLUIDA'
  | 'CANCELADA';

export interface ServicoDoUsuarioDTO {
  id: string;
  usuarioSolicitante: string;
  usuarioPrestador: string | null;
  servico: string;
  diaSelecionado: string;
  horarioSolicitado: string;
  observacao: string;
  endereco: string;
  status: StatusSolicitacao;
}