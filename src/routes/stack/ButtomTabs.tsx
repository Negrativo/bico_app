import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Perfil from '../../pages/principal/perfil/Perfil';
import CategoriasServico from '../../pages/principal/categoriasServico/CategoriasServico';
import { propsNavigationStack } from './models/model';
import { colors } from '../../theme';

const { Navigator, Screen } = createMaterialBottomTabNavigator<propsNavigationStack>();

export default function BottomTabs() {
  return (
    <Navigator
      activeColor={colors.primary}
      inactiveColor={colors.textMuted}
      barStyle={{ backgroundColor: colors.surface }}
    >
      <Screen
        name="CategoriaServico"
        component={CategoriasServico}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-variant-outline" color={color} size={24} />
          ),
        }}
      />
      <Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={24} />
          ),
        }}
      />
    </Navigator>
  );
}
