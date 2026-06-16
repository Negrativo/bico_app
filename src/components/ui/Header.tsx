import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, typography } from '../../theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  variant?: 'default' | 'primary';
}

export default function Header({
  title,
  subtitle,
  onBack,
  rightIcon,
  onRightPress,
  variant = 'default',
}: HeaderProps) {
  const isPrimary = variant === 'primary';
  const titleColor = isPrimary ? colors.textOnPrimary : colors.textPrimary;
  const subtitleColor = isPrimary ? 'rgba(255,255,255,0.85)' : colors.textSecondary;
  const iconColor = isPrimary ? colors.textOnPrimary : colors.textPrimary;
  const bg = isPrimary ? colors.primary : 'transparent';

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.side}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            style={styles.iconBtn}
            hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Voltar">
            <Icon name="arrow-left" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.center}>
        <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: subtitleColor }]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={styles.side}>
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightPress}
            style={styles.iconBtn}
            hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}>
            <Icon name={rightIcon} size={22} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    minHeight: 56,
  },
  side: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { flex: 1, alignItems: 'center' },
  title: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.semibold,
  },
  subtitle: {
    fontSize: typography.size.caption,
    marginTop: 2,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
