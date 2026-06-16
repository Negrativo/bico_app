import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { propsStack } from '../../../routes/stack/models/model';
import { empregos } from '../../../data/empregos';
import CategoriasEmpregosComponent from '../../../components/categoriasEmpregos/CategoriasEmpregosComponent';
import styles from './StyleCategoriaServico';
import { colors } from '../../../theme';
import { useUser } from '../../../context/AuthContext';

interface CategoriaMeta {
  icon: string;
  color: string;
  bgColor: string;
}

const CATEGORIA_META: Record<string, CategoriaMeta> = {
  reformaReparo: { icon: 'hammer-screwdriver', color: '#F39C12', bgColor: '#FFF4E0' },
  suporteTecnico: { icon: 'laptop', color: '#3498DB', bgColor: '#EAF4FB' },
  servicoDomestico: { icon: 'broom', color: '#27AE60', bgColor: '#E5F6EC' },
  eventos: { icon: 'party-popper', color: '#E74C3C', bgColor: '#FDECEA' },
  consultoria: { icon: 'briefcase-outline', color: '#8E44AD', bgColor: '#F1E6F8' },
  autos: { icon: 'car-wrench', color: '#2D6CDF', bgColor: '#E8F0FE' },
};

function getMeta(imagem: string): CategoriaMeta {
  return CATEGORIA_META[imagem] || {
    icon: 'shape-outline',
    color: colors.primary,
    bgColor: colors.primaryLight,
  };
}

export default function CategoriasServico() {
  const navigation = useNavigation<propsStack>();
  const { user } = useUser();
  const [search, setSearch] = useState('');

  function acessaServicos(nome: string, listaServicos: string[]) {
    navigation.navigate('ListaServicos', { listaServicos, categoriaNome: nome });
  }

  // Resultado da pesquisa: lista de {servico, categoria}
  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    const results: { servico: string; categoria: string; categoriaServicos: string[] }[] = [];
    empregos.forEach(cat => {
      cat.Servicos.forEach(s => {
        if (s.toLowerCase().includes(q)) {
          results.push({ servico: s, categoria: cat.nome, categoriaServicos: cat.Servicos });
        }
      });
    });
    return results;
  }, [search]);

  const isSearching = search.trim().length > 0;
  const greetingName = user?.nome?.split(' ')[0] || 'Visitante';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={styles.hero}>
        <View style={styles.heroRow}>
          <View>
            <Text style={styles.heroGreeting}>Olá,</Text>
            <Text style={styles.heroName} numberOfLines={1}>{greetingName} 👋</Text>
          </View>
          <TouchableOpacity
            style={styles.heroIconBtn}
            onPress={() => navigation.navigate('Perfil' as never)}
            accessibilityLabel="Abrir perfil"
          >
            <Icon name="account-outline" size={22} color={colors.textOnPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrap}>
          <Icon name="magnify" size={22} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="O que você precisa hoje?"
            placeholderTextColor={colors.textMuted}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {isSearching ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item, idx) => `${item.categoria}-${item.servico}-${idx}`}
            ListHeaderComponent={
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Resultados</Text>
                <Text style={styles.sectionCount}>{searchResults.length}</Text>
              </View>
            }
            ListEmptyComponent={
              <View style={styles.emptyResults}>
                <Icon name="emoticon-sad-outline" size={36} color={colors.textMuted} />
                <Text style={{ marginTop: 8, color: colors.textSecondary }}>
                  Nenhum serviço encontrado para "{search}"
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.servicoRow}
                onPress={() => acessaServicos(item.categoria, item.categoriaServicos)}
                activeOpacity={0.85}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.servicoText}>{item.servico}</Text>
                  <Text style={styles.servicoCategoria}>{item.categoria}</Text>
                </View>
                <Icon name="chevron-right" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categorias</Text>
              <Text style={styles.sectionCount}>{empregos.length}</Text>
            </View>

            <FlatList
              data={empregos}
              keyExtractor={item => item._id}
              numColumns={2}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const meta = getMeta(item.imagem);
                return (
                  <CategoriasEmpregosComponent
                    nome={item.nome}
                    icon={meta.icon}
                    color={meta.color}
                    bgColor={meta.bgColor}
                    totalServicos={item.Servicos.length}
                    onPress={() => acessaServicos(item.nome, item.Servicos)}
                  />
                );
              }}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
