import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginTop: spacing.xs,
  },
});

export default styles;
