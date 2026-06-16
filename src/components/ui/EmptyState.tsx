import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, typography } from '../../theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export default function EmptyState({
  icon = 'inbox-outline',
  title,
  description,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={48} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  description: {
    marginTop: spacing.sm,
    fontSize: typography.size.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
