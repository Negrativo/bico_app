import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, shadow, spacing } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: keyof typeof spacing | 'none';
}

export default function Card({
  children,
  style,
  variant = 'elevated',
  padding = 'lg',
}: CardProps) {
  const variantStyle =
    variant === 'elevated'
      ? [styles.elevated, shadow.md]
      : variant === 'outlined'
      ? styles.outlined
      : styles.flat;

  const paddingStyle = padding === 'none' ? null : { padding: spacing[padding] };

  return (
    <View style={[styles.base, variantStyle, paddingStyle, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
  },
  elevated: {
    backgroundColor: colors.surface,
  },
  outlined: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  flat: {
    backgroundColor: colors.surfaceAlt,
  },
});
