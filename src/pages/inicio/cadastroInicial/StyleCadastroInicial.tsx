import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../../theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  modal: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },
  modalText: {
    fontSize: typography.size.bodyLg,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  hero: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  badgeText: {
    color: colors.primary,
    fontSize: typography.size.caption,
    fontWeight: typography.weight.semibold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.size.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  form: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },

  errorBox: {
    backgroundColor: colors.dangerLight,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.danger,
    fontSize: typography.size.body,
    textAlign: 'center',
  },

  terms: {
    fontSize: typography.size.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: typography.weight.semibold,
  },
});

export default styles;
