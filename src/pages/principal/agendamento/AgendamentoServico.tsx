import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { GOOGLE_API_KEY } from '../../../../environments';
import { useRoute } from '@react-navigation/native';
import { AgendamentoServicoParams, propsStack } from '../../../routes/stack/models/model';
import { SolicitacaoDTO } from '../../../dtos/SolicitacaoDTO';
import { solicitarServico } from '../../../service/solicitacaoService/solicitacaoService';
import { useUser } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import CalendarioComponent from '../../../components/calendario/CalendarioComponent';
import DateTimePicker from '@react-native-community/datetimepicker'
import Local from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import styles from './StyleAgendamentoServico';
import Toast from 'react-native-toast-message';

export default function () {
  Geocoder.init(GOOGLE_API_KEY);
  const navigation = useNavigation<propsStack>();
  const [horaAgendamento, setHoras] = useState('00:00');
  const [mostraSelecaoHorario, setSelecaoHorario] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState<string>('');
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [observacao, setObservacao] = useState("");
  const [enviando, setEnviando] = useState(false);

  const { user } = useUser();
  const params = useRoute();
  const servicoSelecionado: AgendamentoServicoParams = params.params as unknown as AgendamentoServicoParams;

  const getLocate = async () => {
    Geocoder.init(GOOGLE_API_KEY);
    Local.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        Geocoder.from({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
          .then(addressJson => {
            const _location = addressJson.results[0].formatted_address;
            setLocation(_location);
          })
          .catch(error => {
            Toast.show({
              type: 'error',
              text1: 'Erro ao buscar localização',
              text2: 'Verifique se a localização do aparelho esta habilitada e o BICO tem permissão.',
              visibilityTime: 8000,
            });
          });
      },
      (error) => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao buscar localização',
          text2: 'Verifique se a localização do aparelho esta habilitada e o BICO tem permissão.',
          visibilityTime: 8000,
        });
        console.log('Error location: ' + error);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 1000
      }
    )
  }

  const onChange = (event: any, selectedDate: any) => {
    if (event.type === "set") {
      let currentDate = selectedDate.toString();
      currentDate = currentDate.slice(16, 21);
      setHoras(currentDate);
    }
    setSelecaoHorario(!mostraSelecaoHorario);
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
    if (!horaAgendamento || horaAgendamento === '00:00') {
      Toast.show({ type: 'error', text1: 'Selecione um horário' });
      return;
    }
    if (!latitude || !longitude || !location) {
      Toast.show({ type: 'error', text1: 'Selecione uma localização (toque em "Buscar localização")' });
      return;
    }

    setEnviando(true);
    try {
      const solicitacaoDTO: SolicitacaoDTO = {
        usuarioSolicitante: user.id,
        servico: servicoSelecionado.servicoSelecionado,
        diaSelecionado,
        horarioSolicitado: horaAgendamento,
        observacao,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        endereco: location,
      };
      const isSucess = await solicitarServico(solicitacaoDTO);
      if (isSucess === true) {
        navigation.navigate('Home');
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textNome}>{servicoSelecionado.servicoSelecionado}</Text>
        <View style={styles.viewCalendario}>
          <Text style={styles.textGeral}>Qual dia gostaria de agendar:</Text>
          <CalendarioComponent
            diaSelecionado={setDiaSelecionado}
          ></CalendarioComponent>
        </View>
        <View style={styles.viewHorario}>
          <Text style={styles.textGeral}>Qual o melhor horário para a realização do serviço:</Text>
          <TouchableOpacity onPress={() => setSelecaoHorario(true)} style={styles.horarioInput}>
            <Text style={styles.textHoraSelecionada} >{horaAgendamento}</Text>
          </TouchableOpacity>
          {mostraSelecaoHorario &&
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={'time'}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          }
        </View>
        <View style={styles.formObservacao}>
          <Text style={styles.textGeral}>Deseja adicionar alguma observação?</Text>
          <View style={styles.formInputObservacao}>
            <TextInput style={styles.inputObservacao}
              multiline={true}
              placeholder={"Observação"}
              placeholderTextColor={"#FFFFFF"}
              maxLength={200}
              onChangeText={setObservacao}
            />
          </View>
        </View>
        <View style={styles.formEndereco}>
          <Text style={styles.textGeral}>Selecione o endereço para realização do serviço:</Text>
          <View style={styles.formInputObservacao}>
            <TextInput
              style={styles.textEndereco}
              multiline={false}
              placeholder={"Adicionar endereço"}
              placeholderTextColor={"#FFFFFF"}
              maxLength={200}
            >
              {location}
            </TextInput>
          </View>
          <TouchableOpacity onPress={getLocate}>
            <Text style={styles.textAdicionarEndereco} >Buscar localização</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={solicitar} disabled={enviando} style={[styles.buttonSolicitacao, enviando && { opacity: 0.6 }]}>
            <Text style={styles.textFinalizacao}>{enviando ? 'ENVIANDO...' : 'SOLICITAR PROFISSIONAL'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

