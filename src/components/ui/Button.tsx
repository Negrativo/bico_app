import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, radius, spacing, typography } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: string;
  iconRight?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
}: ButtonProps) {
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];
  const isDisabled = disabled || loading;

  const containerStyle: StyleProp<ViewStyle> = [
    styles.base,
    sizeStyle.container,
    variantStyle.container,
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const labelStyle: StyleProp<TextStyle> = [
    styles.label,
    sizeStyle.label,
    variantStyle.label,
    textStyle,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={containerStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}>
      {loading ? (
        <ActivityIndicator color={variantStyle.iconColor} />
      ) : (
        <View style={styles.content}>
          {iconLeft && (
            <Icon
              name={iconLeft}
              size={sizeStyle.icon}
              color={variantStyle.iconColor}
              style={styles.iconLeft}
            />
          )}
          <Text style={labelStyle} numberOfLines={1}>
            {label}
          </Text>
          {iconRight && (
            <Icon
              name={iconRight}
              size={sizeStyle.icon}
              color={variantStyle.iconColor}
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const VARIANT_STYLES = {
  primary: {
    container: { backgroundColor: colors.primary },
    label: { color: colors.textOnPrimary },
    iconColor: colors.textOnPrimary,
  },
  secondary: {
    container: {
      backgroundColor: colors.surface,
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    label: { color: colors.primary },
    iconColor: colors.primary,
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    label: { color: colors.primary },
    iconColor: colors.primary,
  },
  danger: {
    container: { backgroundColor: colors.danger },
    label: { color: colors.textOnPrimary },
    iconColor: colors.textOnPrimary,
  },
} as const;

const SIZE_STYLES = {
  sm: {
    container: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, minHeight: 36 },
    label: { fontSize: typography.size.body },
    icon: 16,
  },
  md: {
    container: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, minHeight: 46 },
    label: { fontSize: typography.size.bodyLg },
    icon: 18,
  },
  lg: {
    container: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl, minHeight: 54 },
    label: { fontSize: typography.size.title },
    icon: 20,
  },
} as const;

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { alignSelf: 'stretch' },
  disabled: { opacity: 0.5 },
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  label: { fontWeight: typography.weight.semibold, letterSpacing: 0.3 },
  iconLeft: { marginRight: spacing.sm },
  iconRight: { marginLeft: spacing.sm },
});
