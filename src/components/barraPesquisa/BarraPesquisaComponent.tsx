import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BarraPesquisaProps } from './BarraPesquisaProps';
import styles from './StyleBarraPesquisaComponent';
import { colors } from '../../theme';

export default function Pesquisa(props: BarraPesquisaProps) {
  const [search, setSearch] = useState('');
  const listaEmpregos = props.Lista;
  const placeholder = props.placeholder;

  function selecionado(nome: string) {
    props.selecionaProfissao(nome);
    setSearch('');
  }

  const filtrados =
    search.length > 0
      ? listaEmpregos.filter(list =>
          list.toLowerCase().includes(search.toLowerCase()),
        )
      : [];

  return (
    <View style={styles.formComponente}>
      <View style={styles.formBarraPesquisa}>
        <Icon name="magnify" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.barraPesquisa}
          value={search}
          onChangeText={setSearch}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Icon name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {filtrados.length > 0 && (
        <View style={styles.resultsCard}>
          <ScrollView keyboardShouldPersistTaps="handled">
            {filtrados.map((list, index) => (
              <TouchableOpacity
                key={`${list}-${index}`}
                style={styles.itensPesquisa}
                onPress={() => selecionado(list)}
              >
                <Text style={styles.textoOpcao}>{list}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
