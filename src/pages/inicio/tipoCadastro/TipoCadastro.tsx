/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../../routes/stack/models/model';
import styles from './StyleTipoCadastro';
import { colors } from '../../../theme';

const TipoCadastro = () => {
  const video = require('../../../../assets/fundofinal.mp4');
  const logo = require('../../../../assets/BICO-3.png');
  const navigation = useNavigation<propsStack>();

  function navigateCadastroCliente() {
    navigation.navigate('CadastroInicial', { isCadastroProfissional: false });
  }

  function navigateCadastroProfissional() {
    navigation.navigate('CadastroInicial', { isCadastroProfissional: true });
  }

  function voltarLogin() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Video
        source={video}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Como você quer usar o BICO?</Text>
          <Text style={styles.subtitle}>
            Escolha a melhor opção para o seu perfil
          </Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity
            style={styles.option}
            activeOpacity={0.85}
            onPress={navigateCadastroCliente}
          >
            <View style={[styles.optionIconWrap, styles.optionIconWrapClient]}>
              <Icon name="account-search-outline" size={28} color={colors.primary} />
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Sou cliente</Text>
              <Text style={styles.optionDescription}>
                Quero contratar profissionais qualificados
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            activeOpacity={0.85}
            onPress={navigateCadastroProfissional}
          >
            <View style={[styles.optionIconWrap, styles.optionIconWrapPro]}>
              <Icon name="tools" size={28} color={colors.accentDark} />
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Sou prestador</Text>
              <Text style={styles.optionDescription}>
                Quero oferecer meus serviços e receber pedidos
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.backRow}>
          <TouchableOpacity onPress={voltarLogin}>
            <Text style={styles.backText}>
              Já tem conta? <Text style={styles.backLink}>Entrar</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TipoCadastro;
