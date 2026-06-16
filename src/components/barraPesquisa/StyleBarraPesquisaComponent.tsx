import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadow } from '../../theme';

const styles = StyleSheet.create({
  formComponente: {
    width: '100%',
    position: 'relative',
  },
  formBarraPesquisa: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  iconPesquisa: {
    width: 20,
    height: 20,
    tintColor: colors.textSecondary,
    marginRight: spacing.sm,
  },
  barraPesquisa: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.size.bodyLg,
    paddingVertical: 0,
  },
  resultsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginTop: spacing.sm,
    maxHeight: 220,
    ...shadow.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itensPesquisa: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  textoOpcao: {
    fontSize: typography.size.body,
    color: colors.textPrimary,
  },
  botaoSelecao: {
    width: '100%',
  },
});

export default styles;
