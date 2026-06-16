import React from 'react';
import Login from '../../pages/inicio/login/login';
import CadastroInicial from '../../pages/inicio/cadastroInicial/CadastroInicial';
import CadastroFinal from '../../pages/inicio/cadastroFinal/CadastroFinal';
import TipoCadastro from '../../pages/inicio/tipoCadastro/TipoCadastro';
import ListaServicos from '../../pages/principal/listaServicos/ListaServicos';
import AgendamentoServico from '../../pages/principal/agendamento/AgendamentoServico';
import { propsNavigationStack } from './models/model';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './ButtomTabs';
import { useUser } from '../../context/AuthContext';
import SolicitacoesServico from '../../pages/principal/solicitacoesServico/SolicitacoesServico';
import MinhasSolicitacoes from '../../pages/principal/minhasSolicitacoes/MinhasSolicitacoes';

const {Navigator, Screen} = createNativeStackNavigator<propsNavigationStack>();

export default function () {
  const { user } = useUser();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {!!user?.id ? (
        <>
          <Screen
            name="Home"
            children={BottomTabs}
            options={{
              headerLeft: () => null,
              headerShown: false
            }}
          />
          <Screen name="ListaServicos" component={ListaServicos} />
          <Screen name="AgendamentoServico" component={AgendamentoServico} />
          <Screen name='SolicitacoesServico' component={SolicitacoesServico} />
          <Screen name='MinhasSolicitacoes' component={MinhasSolicitacoes} />
        </>
      ) : (
        <>
          <Screen name="Login" component={Login} />
          <Screen name="TipoCadastro" component={TipoCadastro} />
          <Screen name="CadastroInicial" component={CadastroInicial} />
          <Screen name="CadastroFinal" component={CadastroFinal} />
        </>
      )}
    </Navigator>
  );
}
