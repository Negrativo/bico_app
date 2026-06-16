import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadow } from '../../../theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  hero: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
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

  section: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: radius.lg,
    padding: spacing.lg,
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

  enderecoBox: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
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

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.md,
  },
  empty: {
    fontSize: typography.size.body,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },

  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

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
});

export default styles;
