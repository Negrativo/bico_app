import { StyleSheet } from 'react-native';
import { colors, radius, shadow, spacing, typography } from '../../../theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: typography.size.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  heroTitle: {
    color: colors.textOnPrimary,
    fontSize: typography.size.titleLg,
    fontWeight: typography.weight.bold,
  },

  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 120,
  },

  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },

  horarioInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 56,
    borderWidth: 1,
    borderColor: colors.border,
  },
  horarioText: {
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    letterSpacing: 2,
  },

  textareaWrap: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 88,
  },
  textarea: {
    color: colors.textPrimary,
    fontSize: typography.size.body,
    textAlignVertical: 'top',
    minHeight: 70,
    padding: 0,
  },

  enderecoBox: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    minHeight: 50,
    justifyContent: 'center',
  },
  enderecoText: {
    fontSize: typography.size.body,
    color: colors.textPrimary,
  },
  enderecoEmpty: {
    fontSize: typography.size.body,
    color: colors.textMuted,
    fontStyle: 'italic',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default styles;
