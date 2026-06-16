import { StyleSheet } from 'react-native';
import { colors, radius, shadow, spacing, typography } from '../../../theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  hero: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    alignItems: 'center',
  },
  avatarRing: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    padding: 4,
    borderRadius: 100,
  },
  nome: {
    color: colors.textOnPrimary,
    fontSize: typography.size.titleLg,
    fontWeight: typography.weight.bold,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  email: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: typography.size.body,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    marginTop: spacing.md,
  },
  roleBadgeText: {
    color: colors.textOnPrimary,
    fontSize: typography.size.caption,
    fontWeight: typography.weight.semibold,
    marginLeft: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  statsCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: -spacing.xl,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-around',
    ...shadow.md,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: typography.size.titleLg,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },

  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },

  sectionLabel: {
    fontSize: typography.size.caption,
    fontWeight: typography.weight.semibold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },

  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadow.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuIconDanger: {
    backgroundColor: colors.dangerLight,
  },
  menuLabel: {
    flex: 1,
    fontSize: typography.size.bodyLg,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  menuLabelDanger: {
    color: colors.danger,
  },
  menuDescription: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.lg + 40 + spacing.md,
  },

  version: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: typography.size.caption,
    marginTop: spacing.xl,
  },
});

export default styles;
