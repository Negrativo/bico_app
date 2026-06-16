import { StyleSheet } from 'react-native';
import { colors, radius, shadow, spacing, typography } from '../../theme';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    margin: spacing.sm,
    minHeight: 140,
    ...shadow.sm,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  nome: {
    fontSize: typography.size.bodyLg,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});

export default styles;
