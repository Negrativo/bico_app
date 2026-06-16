import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './StylePerfil';
import { useUser } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../../routes/stack/models/model';

export default function () {
  const { user, LogoutUser } = useUser();
  const navigation = useNavigation<propsStack>();

  const isPrestador = !!user && user.servicos && user.servicos.length > 0;

  function abrirSolicitacoesRecebidas(): void {
    navigation.navigate('SolicitacoesServico');
  }

  function abrirMinhasSolicitacoes(): void {
    navigation.navigate('MinhasSolicitacoes');
  }

  function logoutUser(): void {
    LogoutUser();
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.formCabecalhoPerfil}>
          <Text style={styles.textNome}>{user?.nome}</Text>
          {!!user?.email && <Text style={styles.Text}>{user.email}</Text>}
        </View>
        <Text style={styles.Text}>__________________________</Text>
        <View style={styles.scrollContainer}>
          <View style={styles.formBottons}>
            <TouchableOpacity style={styles.buttonCadastro} onPress={abrirMinhasSolicitacoes}>
              <Text style={styles.textBottom}>Minhas solicitações</Text>
            </TouchableOpacity>
            {isPrestador && (
              <TouchableOpacity style={styles.buttonCadastro} onPress={abrirSolicitacoesRecebidas}>
                <Text style={styles.textBottom}>Solicitações recebidas</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.buttonCadastro}>
              <Text style={styles.textBottom}>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCadastro} onPress={logoutUser}>
              <Text style={styles.textBottom}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
