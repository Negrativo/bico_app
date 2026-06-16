import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CategoriaProps } from './CategoriaEmpregoProps';
import styles from './StylesCategoriasEmpregos';

export default function CategoriasEmpregos(props: CategoriaProps) {
  if (!props?.nome) return null;
  const subtitle =
    typeof props.totalServicos === 'number'
      ? props.totalServicos === 0
        ? 'Em breve'
        : `${props.totalServicos} serviço${props.totalServicos > 1 ? 's' : ''}`
      : undefined;

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.card} activeOpacity={0.85}>
      <View style={[styles.iconWrap, { backgroundColor: props.bgColor }]}>
        <Icon name={props.icon} size={28} color={props.color} />
      </View>
      <Text style={styles.nome} numberOfLines={2}>{props.nome}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );
}
