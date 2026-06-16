import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  conteudo: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  loaderWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
