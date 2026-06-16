import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListaServicosParams, propsStack } from '../../../routes/stack/models/model';
import styles from './StyleListaServicos';
import { Header, Screen, EmptyState } from '../../../components/ui';
import { colors, spacing } from '../../../theme';

export default function ListaServicos() {
  const params = useRoute();
  const navigation = useNavigation<propsStack>();
  const ListaServicos: ListaServicosParams = params.params as unknown as ListaServicosParams;

  const [search, setSearch] = useState('');
  const categoriaNome = ListaServicos?.categoriaNome ?? 'Serviços';

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ListaServicos.listaServicos;
    return ListaServicos.listaServicos.filter(s => s.toLowerCase().includes(q));
  }, [search, ListaServicos.listaServicos]);

  function toAgendamentoServico(servicoSelecionado: string) {
    navigation.navigate('AgendamentoServico', { servicoSelecionado });
  }

  if (!ListaServicos.listaServicos || ListaServicos.listaServicos.length === 0) {
    return (
      <Screen padded={false}>
        <View style={{ paddingHorizontal: spacing.lg }}>
          <Header title={categoriaNome} onBack={() => navigation.goBack()} />
        </View>
        <EmptyState
          icon="clock-time-eight-outline"
          title="Em breve"
          description="Esta categoria ainda não possui serviços cadastrados."
        />
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      <View style={{ paddingHorizontal: spacing.lg }}>
        <Header
          title={categoriaNome}
          subtitle={`${ListaServicos.listaServicos.length} serviço${ListaServicos.listaServicos.length > 1 ? 's' : ''}`}
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.searchWrap}>
        <Icon name="magnify" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar serviço..."
          placeholderTextColor={colors.textMuted}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Icon name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item, idx) => `${item}-${idx}`}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="emoticon-sad-outline" size={36} color={colors.textMuted} />
            <Text style={styles.emptyText}>Nenhum serviço encontrado</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toAgendamentoServico(item)}
            style={styles.row}
            activeOpacity={0.85}
          >
            <View style={styles.rowLeft}>
              <View style={styles.iconCircle}>
                <Icon name="briefcase-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.rowText} numberOfLines={2}>{item}</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}
