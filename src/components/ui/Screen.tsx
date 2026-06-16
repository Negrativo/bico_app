import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme';

interface ScreenProps {
  children: React.ReactNode;
  /** Adiciona padding lateral padrão (lg). Default true. */
  padded?: boolean;
  /** Envolve em ScrollView. Default false. */
  scrollable?: boolean;
  /** Envolve em KeyboardAvoidingView. Default true. */
  keyboardAware?: boolean;
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  /** Quando true, ignora a SafeArea (tela imersiva, ex. vídeo fundo). */
  edgeToEdge?: boolean;
}

export default function Screen({
  children,
  padded = true,
  scrollable = false,
  keyboardAware = true,
  backgroundColor = colors.background,
  statusBarStyle = 'dark-content',
  style,
  contentStyle,
  edgeToEdge = false,
}: ScreenProps) {
  const Wrapper: any = edgeToEdge ? View : SafeAreaView;
  const wrapperProps = edgeToEdge
    ? {}
    : { edges: ['top', 'left', 'right'] as const };

  const inner = (
    <View
      style={[
        styles.inner,
        padded && styles.padded,
        contentStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <Wrapper {...wrapperProps} style={[styles.root, { backgroundColor }, style]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
        translucent={edgeToEdge}
      />
      {keyboardAware ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {scrollable ? (
            <ScrollView
              style={styles.flex}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              {inner}
            </ScrollView>
          ) : (
            inner
          )}
        </KeyboardAvoidingView>
      ) : scrollable ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  inner: { flex: 1 },
  padded: { paddingHorizontal: spacing.lg },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.xxl },
});
