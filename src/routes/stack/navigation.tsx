import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {propsNavigationStack} from './models/model';

import Login from '../../pages/inicio/login/Login';
import CadastroInicial from '../../pages/inicio/cadastroInicial/CadastroInicial';
import CadastroFinal from '../../pages/inicio/cadastroFinal/CadastroFinal';

const {Navigator, Screen} = createNativeStackNavigator<propsNavigationStack>();

export default function () {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Login" component={Login} />
      <Screen name="CadastroInicial" component={CadastroInicial} />
      <Screen name="CadastroFinal" component={CadastroFinal} />
    </Navigator>
  );
}