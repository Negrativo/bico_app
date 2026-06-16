import React, { forwardRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, radius, spacing, typography } from '../../theme';

export interface InputProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string | false;
  iconLeft?: string;
  iconRight?: string;
  onPressIconRight?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    hint,
    error,
    iconLeft,
    iconRight,
    onPressIconRight,
    containerStyle,
    secureTextEntry,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState<boolean>(!!secureTextEntry);

  const showPasswordToggle = !!secureTextEntry;
  const effectiveIconRight = showPasswordToggle
    ? hidden
      ? 'eye-outline'
      : 'eye-off-outline'
    : iconRight;
  const effectivePressRight = showPasswordToggle
    ? () => setHidden(prev => !prev)
    : onPressIconRight;

  const showError = !!error;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.field,
          focused && styles.fieldFocused,
          showError && styles.fieldError,
        ]}>
        {iconLeft && (
          <Icon
            name={iconLeft}
            size={20}
            color={focused ? colors.primary : colors.textMuted}
            style={styles.iconLeft}
          />
        )}
        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor={colors.textMuted}
          onFocus={e => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          secureTextEntry={hidden}
          {...rest}
        />
        {effectiveIconRight && (
          <TouchableOpacity
            disabled={!effectivePressRight}
            onPress={effectivePressRight}
            style={styles.iconRightWrapper}>
            <Icon
              name={effectiveIconRight}
              size={20}
              color={focused ? colors.primary : colors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>
      {showError ? (
        <Text style={styles.error}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    minHeight: 50,
  },
  fieldFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  fieldError: {
    borderColor: colors.danger,
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRightWrapper: {
    paddingLeft: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.size.bodyLg,
    paddingVertical: spacing.md,
  },
  hint: {
    marginTop: spacing.xs,
    fontSize: typography.size.caption,
    color: colors.textMuted,
  },
  error: {
    marginTop: spacing.xs,
    fontSize: typography.size.caption,
    color: colors.danger,
  },
});

export default Input;
