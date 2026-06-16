import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import Local from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ValidateCadastroFone from '../../../components/schema/CadastroFoneSchema';
import Pesquisa from '../../../components/barraPesquisa/BarraPesquisaComponent';
import TagInputSelecionado from '../../../components/tagInput/tagInputSelecionado/TagInputEmpregoSelecionado';
import styles from './StyleCadastroFinal';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CadastroFinalParams, propsStack } from '../../../routes/stack/models/model';
import { GOOGLE_API_KEY } from '../../../../environments';
import { empregos } from '../../../data/empregos';
import { atualizarUsuario } from '../../../service/usuarioService/UsuarioService';
import { Button, Header, Screen } from '../../../components/ui';
import { colors } from '../../../theme';

export default function CadastroFinal() {
  const params = useRoute();
  const navigation = useNavigation<propsStack>();
  const paramsCadastroFinal: CadastroFinalParams = params.params as unknown as CadastroFinalParams;
  Geocoder.init(GOOGLE_API_KEY);
  const usuarioCriado = paramsCadastroFinal?.usuarioId;

  const [EmpregosSelecionados, setEmpregosSelecionados] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const empregosSelecionaveis = empregos.flatMap(e => e.Servicos);

  const hideModal = () => setModalVisible(false);

  const getLocate = async () => {
    setLoadingLocation(true);
    Local.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        Geocoder.from({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
          .then(addressJson => {
            setLocation(addressJson.results[0].formatted_address);
            setLoadingLocation(false);
          })
          .catch(error => {
            console.warn(error);
            setLoadingLocation(false);
          });
      },
      error => {
        console.log('Error location: ' + error);
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 1000 },
    );
  };

  const adicionarProfissao = (empregoSelecionado: string) => {
    if (!EmpregosSelecionados.includes(empregoSelecionado)) {
      setEmpregosSelecionados([...EmpregosSelecionados, empregoSelecionado]);
    }
  };

  const removerProfissao = (empregoSelecionado: string) => {
    setEmpregosSelecionados(EmpregosSelecionados.filter(e => e !== empregoSelecionado));
  };

  return (
    <Screen scrollable padded={false}>
      <View style={{ paddingHorizontal: 16 }}>
        <Header title="Cadastro de prestador" onBack={() => navigation.goBack()} />
      </View>

      <View style={styles.hero}>
        <Text style={styles.title}>Conte sobre você</Text>
        <Text style={styles.subtitle}>
          Defina sua localização e os serviços que você oferece
        </Text>
      </View>

      <Formik
        initialValues={{}}
        validationSchema={ValidateCadastroFone}
        onSubmit={async () => {
          if (submitting) return;
          setSubmitting(true);
          try {
            const ok = await atualizarUsuario(
              usuarioCriado,
              latitude.toString(),
              longitude.toString(),
              location,
              EmpregosSelecionados,
            );
            if (ok) {
              setMensagemModal('Cadastro finalizado com sucesso!');
              setModalVisible(true);
              setTimeout(() => {
                hideModal();
                navigation.navigate('Login');
              }, 1300);
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {(props) => (
          <View>
            <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
              <View style={styles.modal}>
                <Text style={styles.modalText}>{mensagemModal}</Text>
                <Button label="Fechar" size="sm" fullWidth={false} onPress={hideModal} />
              </View>
            </Modal>

            {/* Endereço */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconWrap}>
                  <Icon name="map-marker-outline" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>Endereço</Text>
                  <Text style={styles.sectionSubtitle}>
                    Onde você atende
                  </Text>
                </View>
              </View>

              <View style={styles.enderecoBox}>
                {location ? (
                  <Text style={styles.enderecoText}>{location}</Text>
                ) : (
                  <Text style={styles.enderecoEmpty}>Nenhum endereço definido</Text>
                )}
              </View>

              <Button
                label={location ? 'Atualizar localização' : 'Usar minha localização'}
                iconLeft="crosshairs-gps"
                variant="secondary"
                size="sm"
                onPress={getLocate}
                loading={loadingLocation}
              />
            </View>

            {/* Profissões */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconWrap}>
                  <Icon name="briefcase-outline" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>Seus serviços</Text>
                  <Text style={styles.sectionSubtitle}>
                    Adicione tudo o que você sabe fazer
                  </Text>
                </View>
              </View>

              <Pesquisa
                Lista={empregosSelecionaveis}
                placeholder="Buscar serviço..."
                selecionaProfissao={adicionarProfissao}
              />

              <View style={styles.chipsContainer}>
                {EmpregosSelecionados.length === 0 ? (
                  <Text style={styles.empty}>Nenhum serviço selecionado</Text>
                ) : (
                  EmpregosSelecionados.map((emprego) => (
                    <TagInputSelecionado
                      key={emprego}
                      emprego={emprego}
                      removeProfissao={removerProfissao}
                    />
                  ))
                )}
              </View>
            </View>

            <View style={styles.footer}>
              <Button
                label="FINALIZAR CADASTRO"
                size="lg"
                iconRight="check-circle-outline"
                onPress={() => props.handleSubmit()}
                loading={submitting}
              />
            </View>
          </View>
        )}
      </Formik>
    </Screen>
  );
}
