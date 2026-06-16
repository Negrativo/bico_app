import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type propsNavigationStack = {
  Home: undefined;
  TipoCadastro: undefined;
  Login: undefined;
  CadastroInicial: TipoCadastroParams;
  CadastroFinal: CadastroFinalParams;
  CategoriaServico: undefined;
  ListaServicos: ListaServicosParams;
  AgendamentoServico: AgendamentoServicoParams;
  Perfil: undefined;
  SolicitacoesServico: undefined;
  MinhasSolicitacoes: undefined;
};

export interface TipoCadastroParams {
  isCadastroProfissional: Boolean;
}

export interface CadastroFinalParams {
  usuarioId: String;
}

export interface ListaServicosParams {
  listaServicos: string[];
  categoriaNome?: string;
}

export interface AgendamentoServicoParams {
  servicoSelecionado: string;
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
