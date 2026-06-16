import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../../theme';

const styles = StyleSheet.create({
  formComponent: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    margin: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.primaryDark,
    fontSize: typography.size.body,
    fontWeight: typography.weight.semibold,
    marginRight: spacing.xs,
  },
  remover: {
    color: colors.primary,
    fontSize: typography.size.body,
    fontWeight: typography.weight.bold,
    marginLeft: spacing.xs,
  },
});

export default styles;
