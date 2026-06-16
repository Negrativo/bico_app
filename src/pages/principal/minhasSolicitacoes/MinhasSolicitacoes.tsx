import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import styles from './StyleMinhasSolicitacoes';
import {
  getSolicitacoesDoCliente,
  cancelarSolicitacao,
} from '../../../service/solicitacaoService/solicitacaoService';
import { useUser } from '../../../context/AuthContext';
import { ServicoDoUsuarioDTO } from '../../../dtos/ServicoDoUsuarioDTO';
import SolicitacaoServico from '../../../components/solicitacaoServico/SolicitacaoServicoComponent';

export default function MinhasSolicitacoes() {
  const [dadosLista, setDados] = useState<ServicoDoUsuarioDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useUser();

  const carregar = useCallback(async () => {
    if (!user?.id) {
      setDados([]);
      setCarregando(false);
      return;
    }
    try {
      const lista = await getSolicitacoesDoCliente(user.id);
      setDados(lista ?? []);
    } catch {
      setDados([]);
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      carregar();
    }, [carregar]),
  );

  const atualizarItem = (atualizado: ServicoDoUsuarioDTO | null) => {
    if (!atualizado) return;
    setDados(prev => prev.map(s => (s.id === atualizado.id ? atualizado : s)));
  };

  const onCancelar = async (id: string) => atualizarItem(await cancelarSolicitacao(id));

  if (carregando) {
    return (
      <View style={[styles.container, styles.vazioWrapper]}>
        <ActivityIndicator size="large" color="#0c5fa8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas solicitações</Text>
      {dadosLista.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
          data={dadosLista}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                carregar();
              }}
            />
          }
          renderItem={({ item }) => (
            <SolicitacaoServico
              modo="cliente"
              status={item.status}
              usuarioSolicitante={item.usuarioSolicitante}
              usuarioPrestador={item.usuarioPrestador}
              servico={item.servico}
              diaSelecionado={item.diaSelecionado}
              horarioSolicitado={item.horarioSolicitado}
              observacao={item.observacao}
              endereco={item.endereco}
              onPressCancelar={() => onCancelar(item.id)}
            />
          )}
        />
      ) : (
        <View style={styles.vazioWrapper}>
          <Text style={styles.textoVazio}>Você ainda não fez nenhuma solicitação.</Text>
        </View>
      )}
    </View>
  );
}
