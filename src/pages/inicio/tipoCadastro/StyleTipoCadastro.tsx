import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadow } from '../../../theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primaryDark },

  video: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },

  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },

  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  logo: { width: 90, height: 90, resizeMode: 'contain' },
  title: {
    color: colors.textOnPrimary,
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: typography.size.body,
    marginTop: spacing.sm,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },

  options: {
    marginTop: spacing.xl,
  },

  option: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow.md,
  },
  optionIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  optionIconWrapClient: {
    backgroundColor: colors.primaryLight,
  },
  optionIconWrapPro: {
    backgroundColor: '#FFF1DC',
  },
  optionText: { flex: 1 },
  optionTitle: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  optionDescription: {
    fontSize: typography.size.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  backRow: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: typography.size.body,
  },
  backLink: {
    color: colors.accent,
    fontWeight: typography.weight.bold,
  },
});

export default styles;
