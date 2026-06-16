import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './StylePerfil';
import { useUser } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../../routes/stack/models/model';
import { Avatar } from '../../../components/ui';
import { colors } from '../../../theme';

interface MenuOption {
  key: string;
  label: string;
  description?: string;
  icon: string;
  onPress: () => void;
  danger?: boolean;
}

export default function Perfil() {
  const { user, LogoutUser } = useUser();
  const navigation = useNavigation<propsStack>();

  const isPrestador = !!user && user.servicos && user.servicos.length > 0;

  const opcoesPedidos: MenuOption[] = [
    {
      key: 'minhas',
      label: 'Minhas solicitações',
      description: 'Acompanhe os serviços que você contratou',
      icon: 'clipboard-list-outline',
      onPress: () => navigation.navigate('MinhasSolicitacoes'),
    },
    ...(isPrestador
      ? [{
        key: 'recebidas',
        label: 'Solicitações recebidas',
        description: 'Pedidos para os seus serviços',
        icon: 'inbox-multiple-outline',
        onPress: () => navigation.navigate('SolicitacoesServico'),
      }]
      : []),
  ];

  const opcoesConta: MenuOption[] = [
    {
      key: 'editar',
      label: 'Editar perfil',
      description: 'Atualize seus dados pessoais',
      icon: 'account-edit-outline',
      onPress: () => { /* TODO */ },
    },
    {
      key: 'config',
      label: 'Configurações',
      description: 'Notificações, privacidade e mais',
      icon: 'cog-outline',
      onPress: () => { /* TODO */ },
    },
    {
      key: 'ajuda',
      label: 'Ajuda e suporte',
      description: 'Tire dúvidas ou fale conosco',
      icon: 'help-circle-outline',
      onPress: () => { /* TODO */ },
    },
  ];

  const opcoesPerigosas: MenuOption[] = [
    {
      key: 'sair',
      label: 'Sair da conta',
      icon: 'logout-variant',
      onPress: () => LogoutUser(),
      danger: true,
    },
  ];

  function renderMenu(items: MenuOption[]) {
    return (
      <View style={styles.menuCard}>
        {items.map((item, index) => (
          <React.Fragment key={item.key}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconWrap, item.danger && styles.menuIconDanger]}>
                <Icon
                  name={item.icon}
                  size={20}
                  color={item.danger ? colors.danger : colors.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                  {item.label}
                </Text>
                {item.description && (
                  <Text style={styles.menuDescription}>{item.description}</Text>
                )}
              </View>
              {!item.danger && (
                <Icon name="chevron-right" size={22} color={colors.textMuted} />
              )}
            </TouchableOpacity>
            {index < items.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.avatarRing}>
            <Avatar
              name={user?.nome}
              size={84}
              backgroundColor={colors.surface}
              color={colors.primary}
            />
          </View>
          <Text style={styles.nome} numberOfLines={1}>
            {user?.nome || 'Visitante'}
          </Text>
          {!!user?.email && <Text style={styles.email} numberOfLines={1}>{user.email}</Text>}

          <View style={styles.roleBadge}>
            <Icon
              name={isPrestador ? 'tools' : 'account-search-outline'}
              size={14}
              color={colors.textOnPrimary}
            />
            <Text style={styles.roleBadgeText}>
              {isPrestador ? 'Prestador' : 'Cliente'}
            </Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {user?.servicos?.length ?? 0}
            </Text>
            <Text style={styles.statLabel}>Serviços{'\n'}cadastrados</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>—</Text>
            <Text style={styles.statLabel}>Avaliação{'\n'}média</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>—</Text>
            <Text style={styles.statLabel}>Pedidos{'\n'}concluídos</Text>
          </View>
        </View>

        <View style={styles.scrollContent}>
          <Text style={styles.sectionLabel}>Pedidos</Text>
          {renderMenu(opcoesPedidos)}

          <Text style={styles.sectionLabel}>Conta</Text>
          {renderMenu(opcoesConta)}

          <Text style={styles.sectionLabel}>Sessão</Text>
          {renderMenu(opcoesPerigosas)}

          <Text style={styles.version}>BICO v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
