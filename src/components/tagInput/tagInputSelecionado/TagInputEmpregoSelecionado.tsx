import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TagInputProps } from '../TagInputProps';
import styles from './StyleTagInputEmpregoSelecionado';
import { colors } from '../../../theme';

export default function TagInputSelecionado(props: TagInputProps) {
  function removerProfissao(nome: string) {
    props.removeProfissao(nome);
  }

  return (
    <TouchableOpacity
      style={styles.formComponent}
      onPress={() => removerProfissao(props.emprego)}
      activeOpacity={0.7}>
      <Text style={styles.text}>{props.emprego}</Text>
      <Icon name="close-circle" size={16} color={colors.primary} />
    </TouchableOpacity>
  );
}
