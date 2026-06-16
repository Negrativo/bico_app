/**
 * Design tokens centralizados do app BICO.
 * Use sempre estes valores ao invés de literais nos estilos.
 */

export const colors = {
  // Marca
  primary: '#2D6CDF',
  primaryDark: '#1F4FA8',
  primaryLight: '#E8F0FE',
  accent: '#FFB23F',
  accentDark: '#E89A20',

  // Superfícies
  background: '#F4F6FB',
  surface: '#FFFFFF',
  surfaceAlt: '#FAFBFE',
  overlay: 'rgba(15, 23, 42, 0.55)',

  // Texto
  textPrimary: '#1B1F2A',
  textSecondary: '#5A6275',
  textMuted: '#9AA1B3',
  textOnPrimary: '#FFFFFF',

  // Bordas
  border: '#E1E5EE',
  borderStrong: '#C8CEDB',

  // Feedback
  success: '#27AE60',
  successLight: '#E5F6EC',
  warning: '#F39C12',
  warningLight: '#FFF4E0',
  danger: '#E74C3C',
  dangerLight: '#FDECEA',
  info: '#3498DB',
  infoLight: '#EAF4FB',

  // Status da solicitação
  statusPendente: '#F39C12',
  statusAceita: '#2D6CDF',
  statusRecusada: '#E74C3C',
  statusConcluida: '#27AE60',
  statusCancelada: '#7F8C8D',
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const typography = {
  // Tamanhos
  size: {
    caption: 12,
    body: 14,
    bodyLg: 16,
    title: 18,
    titleLg: 22,
    h2: 26,
    h1: 32,
  },
  // Pesos
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const shadow = {
  none: {},
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadow,
};

export type Theme = typeof theme;
