import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import styles from './StyleMinhasSolicitacoes';
import {
  getSolicitacoesDoCliente,
  cancelarSolicitacao,
} from '../../../service/solicitacaoService/solicitacaoService';
import { useUser } from '../../../context/AuthContext';
import { ServicoDoUsuarioDTO } from '../../../dtos/ServicoDoUsuarioDTO';
import SolicitacaoServico from '../../../components/solicitacaoServico/SolicitacaoServicoComponent';
import { EmptyState, Header, Screen } from '../../../components/ui';
import { propsStack } from '../../../routes/stack/models/model';
import { colors, spacing } from '../../../theme';

export default function MinhasSolicitacoes() {
  const [dadosLista, setDados] = useState<ServicoDoUsuarioDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useUser();
  const navigation = useNavigation<propsStack>();

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

  return (
    <Screen padded={false}>
      <View style={{ paddingHorizontal: spacing.lg }}>
        <Header
          title="Minhas solicitações"
          subtitle={dadosLista.length > 0 ? `${dadosLista.length} pedido${dadosLista.length > 1 ? 's' : ''}` : undefined}
          onBack={() => navigation.goBack()}
        />
      </View>

      {carregando ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : dadosLista.length === 0 ? (
        <EmptyState
          icon="clipboard-text-outline"
          title="Nenhuma solicitação"
          description="Você ainda não solicitou nenhum serviço. Explore as categorias na tela inicial."
        />
      ) : (
        <FlatList
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
          data={dadosLista}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              tintColor={colors.primary}
              colors={[colors.primary]}
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
      )}
    </Screen>
  );
}
