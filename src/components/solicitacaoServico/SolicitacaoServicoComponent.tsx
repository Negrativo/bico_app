import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { SolicitacaoServicoProps } from './SolicitacaoServicoProps';
import styles from './StyleSolicitacaoServicoComponent';
import { StatusSolicitacao } from '../../dtos/ServicoDoUsuarioDTO';

const STATUS_LABEL: Record<StatusSolicitacao, string> = {
  PENDENTE: 'Pendente',
  ACEITA: 'Aceita',
  RECUSADA: 'Recusada',
  CONCLUIDA: 'Concluída',
  CANCELADA: 'Cancelada',
};

const STATUS_COR: Record<StatusSolicitacao, string> = {
  PENDENTE: '#f39c12',
  ACEITA: '#0c5fa8',
  RECUSADA: '#c0392b',
  CONCLUIDA: '#27ae60',
  CANCELADA: '#7f8c8d',
};

function formatarData(dia: string): string {
  if (!dia) return '';
  const m = moment(dia);
  return m.isValid() ? m.format('DD/MM/YYYY') : dia;
}

function formatarHora(hora: string): string {
  if (!hora) return '';
  return hora.length > 5 ? hora.slice(0, 5) : hora;
}

export default function SolicitacaoServico(props: SolicitacaoServicoProps) {
  const modo = props.modo ?? 'prestador';
  const status = props.status ?? 'PENDENTE';
  const isPrestador = modo === 'prestador';

  const mostraAceitarRecusar = isPrestador && status === 'PENDENTE';
  const mostraConcluir = isPrestador && status === 'ACEITA';
  const mostraCancelar = !isPrestador && status === 'PENDENTE';

  const tituloPessoa = isPrestador ? 'Solicitante' : 'Prestador';
  const nomePessoa = isPrestador
    ? props.usuarioSolicitante
    : props.usuarioPrestador ?? 'A definir';

  return (
    <View style={styles.containerView}>
      <View style={[styles.badgeStatus, { backgroundColor: STATUS_COR[status] }]}>
        <Text style={styles.badgeStatusTexto}>{STATUS_LABEL[status]}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.alinhamentoTexto}>
          <Text style={styles.textoNegrito}>{tituloPessoa}: </Text>
          <Text style={styles.Texto}>{nomePessoa}</Text>
        </View>
        <View style={styles.alinhamentoTexto}>
          <Text style={styles.textoNegrito}>Serviço: </Text>
          <Text style={styles.Texto}>{props.servico}</Text>
        </View>
        <View style={styles.alinhamentoTexto}>
          <Text style={styles.textoNegrito}>Data: </Text>
          <Text style={styles.Texto}>
            {formatarData(props.diaSelecionado)} às {formatarHora(props.horarioSolicitado)}
          </Text>
        </View>
        <View style={styles.alinhamentoTexto}>
          <Text style={styles.textoNegrito}>Endereço: </Text>
          <Text style={styles.Texto}>{props.endereco}</Text>
        </View>
        {!!props.observacao && (
          <View style={styles.alinhamentoTexto}>
            <Text style={styles.textoNegrito}>Observação: </Text>
            <Text style={styles.Texto}>{props.observacao}</Text>
          </View>
        )}
      </View>

      {(mostraAceitarRecusar || mostraConcluir || mostraCancelar) && (
        <View style={styles.containerBotoes}>
          {mostraAceitarRecusar && (
            <>
              <TouchableOpacity style={styles.botao} onPress={props.onPressAceite}>
                <Text style={styles.textoBotao}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.botao, styles.botaoSecundario]} onPress={props.onPressRecusar}>
                <Text style={styles.textoBotao}>Recusar</Text>
              </TouchableOpacity>
            </>
          )}
          {mostraConcluir && (
            <TouchableOpacity style={[styles.botao, styles.botaoSucesso]} onPress={props.onPressConcluir}>
              <Text style={styles.textoBotao}>Marcar como concluída</Text>
            </TouchableOpacity>
          )}
          {mostraCancelar && (
            <TouchableOpacity style={[styles.botao, styles.botaoSecundario]} onPress={props.onPressCancelar}>
              <Text style={styles.textoBotao}>Cancelar solicitação</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
