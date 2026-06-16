/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import { Formik } from 'formik';
import styles from './styleLogin';

import ValidateLogin from '../../../components/schema/LoginSchema';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../../routes/stack/models/model';
import { useUser } from '../../../context/AuthContext';
import { Button, Input } from '../../../components/ui';

const Login = () => {
  const logo = require('../../../../assets/BICO-3.png');
  const navigation = useNavigation<propsStack>();
  const { LoginUser } = useUser();

  function handleSubmitCadastro() {
    navigation.navigate('TipoCadastro');
  }

  async function handleLogin(email: string, senha: string) {
    const loggedUser = await LoginUser(email, senha);
    if (loggedUser?.id) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Video
        source={require('../../../../assets/fundofinal.mp4')}
        style={styles.video}
        resizeMode="cover"
        repeat={true}
        muted={true}
      />
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.brand}>BICO</Text>
            <Text style={styles.tagline}>
              Conectando você ao profissional certo
            </Text>
          </View>

          <Formik
            initialValues={{ email: '', senha: '', error: '' }}
            validationSchema={ValidateLogin}
            onSubmit={(values) => handleLogin(values.email, values.senha)}
          >
            {(props) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Bem-vindo de volta</Text>
                <Text style={styles.cardSubtitle}>
                  Entre com sua conta para continuar
                </Text>

                {!!props.errors.error && (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{props.errors.error}</Text>
                  </View>
                )}

                <Input
                  label="E-mail"
                  placeholder="seu@email.com"
                  iconLeft="email-outline"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  value={props.values.email}
                  onChangeText={(t) => props.setFieldValue('email', t)}
                  error={props.dirty && props.errors.email}
                />

                <Input
                  label="Senha"
                  placeholder="Sua senha"
                  iconLeft="lock-outline"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                  value={props.values.senha}
                  onChangeText={(t) => props.setFieldValue('senha', t)}
                  error={props.dirty && props.errors.senha}
                />

                <TouchableOpacity style={styles.forgot}>
                  <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <Button
                  label="ENTRAR"
                  size="lg"
                  iconRight="arrow-right"
                  onPress={() => props.handleSubmit()}
                />
              </View>
            )}
          </Formik>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Ainda não tem conta?</Text>
            <TouchableOpacity onPress={handleSubmitCadastro}>
              <Text style={styles.signupLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
