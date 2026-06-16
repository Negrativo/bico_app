import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GOOGLE_API_KEY } from '../../../../environments';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AgendamentoServicoParams, propsStack } from '../../../routes/stack/models/model';
import { SolicitacaoDTO } from '../../../dtos/SolicitacaoDTO';
import { solicitarServico } from '../../../service/solicitacaoService/solicitacaoService';
import { useUser } from '../../../context/AuthContext';
import CalendarioComponent from '../../../components/calendario/CalendarioComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import Local from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import styles from './StyleAgendamentoServico';
import Toast from 'react-native-toast-message';
import { Button, Header, Screen } from '../../../components/ui';
import { colors, spacing } from '../../../theme';
import moment from 'moment';

export default function AgendamentoServico() {
  Geocoder.init(GOOGLE_API_KEY);
  const navigation = useNavigation<propsStack>();
  const [horaAgendamento, setHoras] = useState('');
  const [mostraSelecaoHorario, setSelecaoHorario] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState<string>('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [observacao, setObservacao] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [buscandoLocal, setBuscandoLocal] = useState(false);

  const { user } = useUser();
  const params = useRoute();
  const servicoSelecionado: AgendamentoServicoParams = params.params as unknown as AgendamentoServicoParams;

  const getLocate = () => {
    setBuscandoLocal(true);
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
            setBuscandoLocal(false);
          })
          .catch(() => {
            setBuscandoLocal(false);
            Toast.show({
              type: 'error',
              text1: 'Erro ao buscar localização',
              text2: 'Verifique se a localização do aparelho está habilitada e o BICO tem permissão.',
              visibilityTime: 6000,
            });
          });
      },
      () => {
        setBuscandoLocal(false);
        Toast.show({
          type: 'error',
          text1: 'Erro ao buscar localização',
          text2: 'Verifique se a localização do aparelho está habilitada e o BICO tem permissão.',
          visibilityTime: 6000,
        });
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 1000 },
    );
  };

  const onChangeHora = (event: any, selectedDate: any) => {
    if (event.type === 'set' && selectedDate) {
      const h = String(selectedDate.getHours()).padStart(2, '0');
      const m = String(selectedDate.getMinutes()).padStart(2, '0');
      setHoras(`${h}:${m}`);
    }
    setSelecaoHorario(false);
  };

  const solicitar = async () => {
    if (!user) {
      Toast.show({ type: 'error', text1: 'Faça login para solicitar um serviço' });
      return;
    }
    if (!diaSelecionado) {
      Toast.show({ type: 'error', text1: 'Selecione uma data no calendário' });
      return;
    }
    if (!horaAgendamento) {
      Toast.show({ type: 'error', text1: 'Selecione um horário' });
      return;
    }
    if (!latitude || !longitude || !location) {
      Toast.show({ type: 'error', text1: 'Adicione um endereço' });
      return;
    }

    setEnviando(true);
    try {
      const dto: SolicitacaoDTO = {
        usuarioSolicitante: user.id,
        servico: servicoSelecionado.servicoSelecionado,
        diaSelecionado,
        horarioSolicitado: horaAgendamento,
        observacao,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        endereco: location,
      };
      const ok = await solicitarServico(dto);
      if (ok === true) {
        Toast.show({
          type: 'success',
          text1: 'Solicitação enviada!',
          text2: 'Acompanhe em "Minhas solicitações"',
        });
        navigation.navigate('Home');
      }
    } finally {
      setEnviando(false);
    }
  };

  const dataFormatada = diaSelecionado
    ? moment(diaSelecionado).format('DD/MM/YYYY')
    : null;

  return (
    <Screen padded={false} keyboardAware={false}>
      <View style={{ paddingHorizontal: spacing.lg }}>
        <Header title="Agendar serviço" onBack={() => navigation.goBack()} />
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroLabel}>Você vai contratar</Text>
        <Text style={styles.heroTitle}>{servicoSelecionado.servicoSelecionado}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Data */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconWrap}>
              <Icon name="calendar-month-outline" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Data do serviço</Text>
              <Text style={styles.sectionSubtitle}>
                {dataFormatada ? `Selecionado: ${dataFormatada}` : 'Escolha um dia no calendário'}
              </Text>
            </View>
          </View>
          <CalendarioComponent diaSelecionado={setDiaSelecionado} />
        </View>

        {/* Horário */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconWrap}>
              <Icon name="clock-outline" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Horário</Text>
              <Text style={styles.sectionSubtitle}>Quando o serviço deve começar</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setSelecaoHorario(true)}
            style={styles.horarioInput}
            activeOpacity={0.8}
          >
            <Text style={styles.horarioText}>
              {horaAgendamento || '--:--'}
            </Text>
            <Icon name="clock-edit-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
          {mostraSelecaoHorario && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode="time"
              is24Hour
              display="spinner"
              onChange={onChangeHora}
            />
          )}
        </View>

        {/* Endereço */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconWrap}>
              <Icon name="map-marker-outline" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Endereço</Text>
              <Text style={styles.sectionSubtitle}>Onde o serviço será executado</Text>
            </View>
          </View>

          <View style={styles.enderecoBox}>
            {location ? (
              <Text style={styles.enderecoText}>{location}</Text>
            ) : (
              <Text style={styles.enderecoEmpty}>Nenhum endereço selecionado</Text>
            )}
          </View>

          <Button
            label={location ? 'Atualizar localização' : 'Usar minha localização'}
            iconLeft="crosshairs-gps"
            variant="secondary"
            size="sm"
            onPress={getLocate}
            loading={buscandoLocal}
          />
        </View>

        {/* Observação */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconWrap}>
              <Icon name="note-text-outline" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Observação</Text>
              <Text style={styles.sectionSubtitle}>Opcional — detalhes para o profissional</Text>
            </View>
          </View>
          <View style={styles.textareaWrap}>
            <TextInput
              style={styles.textarea}
              multiline
              numberOfLines={4}
              maxLength={200}
              value={observacao}
              onChangeText={setObservacao}
              placeholder="Ex: Apartamento 302, falar com porteiro João..."
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={enviando ? 'ENVIANDO...' : 'SOLICITAR PROFISSIONAL'}
          size="lg"
          iconRight="send-outline"
          onPress={solicitar}
          loading={enviando}
        />
      </View>
    </Screen>
  );
}
