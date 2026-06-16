import { StyleSheet, Dimensions } from 'react-native';
import { colors, radius, spacing, typography } from '../../../theme';

const { height } = Dimensions.get('window');

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
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    minHeight: height,
  },

  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  brand: {
    color: colors.textOnPrimary,
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
    marginTop: spacing.sm,
    letterSpacing: 1,
  },
  tagline: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: typography.size.body,
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginTop: spacing.xxl,
  },
  cardTitle: {
    fontSize: typography.size.titleLg,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    fontSize: typography.size.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },

  forgot: {
    alignSelf: 'flex-end',
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  forgotText: {
    color: colors.primary,
    fontWeight: typography.weight.semibold,
    fontSize: typography.size.body,
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  signupText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: typography.size.body,
  },
  signupLink: {
    color: colors.accent,
    fontSize: typography.size.body,
    fontWeight: typography.weight.bold,
    marginLeft: spacing.xs,
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
});

export default styles;
