import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import MaskInput, { Masks } from 'react-native-mask-input';

import styles from './StyleCadastroInicial';
import { TipoCadastroParams, propsStack } from '../../../routes/stack/models/model';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cadastrarUsuario } from '../../../service/usuarioService/UsuarioService';
import ValidateCadastro from '../../../components/schema/CadastroSchema';
import { Button, Header, Input, Screen } from '../../../components/ui';
import { colors, radius, spacing, typography } from '../../../theme';

export default function CadastroInicial() {
  const navigation = useNavigation<propsStack>();
  const params = useRoute();
  const tipoCadastro: TipoCadastroParams = params.params as unknown as TipoCadastroParams;
  const isPrestador = tipoCadastro?.isCadastroProfissional === true;

  const [mensagemModal, setMensagemModal] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const hideModal = () => setModalVisible(false);

  return (
    <Screen scrollable padded={false}>
      <View style={{ paddingHorizontal: spacing.lg }}>
        <Header title="Criar conta" onBack={() => navigation.goBack()} />
      </View>

      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {isPrestador ? 'Cadastro de prestador' : 'Cadastro de cliente'}
          </Text>
        </View>
        <Text style={styles.title}>Quase lá!</Text>
        <Text style={styles.subtitle}>
          Preencha seus dados para começar a usar o BICO
        </Text>
      </View>

      <Formik
        initialValues={{ nome: '', email: '', senha: '', senha2: '', telefone: '', error: '' }}
        validationSchema={ValidateCadastro}
        onSubmit={async (values) => {
          const { nome, email, telefone, senha } = values;
          if (!nome || !email || !senha) return;
          const usuarioCriado = await cadastrarUsuario(nome, email, telefone, senha);
          if (usuarioCriado) {
            if (isPrestador) {
              navigation.navigate('CadastroFinal', { usuarioId: usuarioCriado });
            } else {
              setMensagemModal('Conta criada com sucesso!');
              setModalVisible(true);
              setTimeout(() => {
                hideModal();
                navigation.navigate('Login');
              }, 1200);
            }
          }
        }}
      >
        {(props) => (
          <View style={styles.form}>
            <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
              <View style={styles.modal}>
                <Text style={styles.modalText}>{mensagemModal}</Text>
                <Button label="Fechar" size="sm" onPress={hideModal} fullWidth={false} />
              </View>
            </Modal>

            {!!props.errors.error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{props.errors.error}</Text>
              </View>
            )}

            <Input
              label="Nome completo"
              iconLeft="account-outline"
              placeholder="Seu nome"
              autoCapitalize="words"
              value={props.values.nome}
              onChangeText={(t) => props.setFieldValue('nome', t)}
              error={props.dirty && props.errors.nome}
            />

            <Input
              label="E-mail"
              iconLeft="email-outline"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={props.values.email}
              onChangeText={(t) => props.setFieldValue('email', t)}
              error={props.dirty && props.errors.email}
            />

            <View style={{ marginBottom: spacing.lg }}>
              <Text style={{
                fontSize: typography.size.body,
                fontWeight: typography.weight.semibold,
                color: colors.textSecondary,
                marginBottom: spacing.xs,
              }}>
                Telefone
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.surface,
                borderRadius: radius.md,
                borderWidth: 1.5,
                borderColor: colors.border,
                paddingHorizontal: spacing.md,
                minHeight: 50,
              }}>
                <MaskInput
                  style={{
                    flex: 1,
                    color: colors.textPrimary,
                    fontSize: typography.size.bodyLg,
                    paddingVertical: spacing.md,
                  }}
                  value={props.values.telefone}
                  onChangeText={(_masked, unmasked) => props.setFieldValue('telefone', unmasked)}
                  mask={Masks.BRL_PHONE}
                  placeholder="(11) 99999-9999"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <Input
              label="Senha"
              iconLeft="lock-outline"
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              autoCapitalize="none"
              value={props.values.senha}
              onChangeText={(t) => props.setFieldValue('senha', t)}
              error={props.dirty && props.errors.senha}
            />

            <Input
              label="Confirmar senha"
              iconLeft="lock-check-outline"
              placeholder="Digite a senha novamente"
              secureTextEntry
              autoCapitalize="none"
              value={props.values.senha2}
              onChangeText={(t) => props.setFieldValue('senha2', t)}
              error={props.dirty && props.errors.senha2}
            />

            <Button
              label={isPrestador ? 'CONTINUAR' : 'CADASTRAR'}
              size="lg"
              iconRight="arrow-right"
              onPress={() => props.handleSubmit()}
            />

            <Text style={styles.terms}>
              Ao continuar, você concorda com os{' '}
              <Text style={styles.termsLink}>Termos de Uso</Text>
            </Text>
          </View>
        )}
      </Formik>
    </Screen>
  );
}
