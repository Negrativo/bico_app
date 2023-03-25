import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type propsNavigationStack = {
  Login: undefined;
  CadastroInicial: undefined;
  CadastroFinal: CadastroFinalParams;
};

export interface CadastroFinalParams {
  nome: string,
  email: string,
  senha: string
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;