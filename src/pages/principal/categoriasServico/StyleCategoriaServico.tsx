import { StyleSheet } from 'react-native';
import { colors, radius, shadow, spacing, typography } from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  heroGreeting: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: typography.size.body,
  },
  heroName: {
    color: colors.textOnPrimary,
    fontSize: typography.size.title,
    fontWeight: typography.weight.bold,
    marginTop: 2,
  },
  heroIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchWrap: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    height: 50,
    ...shadow.md,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.size.bodyLg,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    paddingVertical: 0,
  },

  content: {
    flex: 1,
    marginTop: -spacing.xl,
  },
  scrollContent: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  sectionCount: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
  },

  emptyResults: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },

  servicoRow: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  servicoText: { flex: 1, fontSize: typography.size.body, color: colors.textPrimary },
  servicoCategoria: { fontSize: typography.size.caption, color: colors.textMuted, marginTop: 2 },
});

export default styles;
