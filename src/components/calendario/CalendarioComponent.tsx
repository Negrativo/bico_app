import React, { useState } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import styles from './StyleCalendarioComponent';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { CalendarioComponentProps } from './CalendarioComponentProps';
import { colors } from '../../theme';

LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'br';

const DATE_FORMAT = 'YYYY-MM-DD';

export default function CalendarioComponent(props: CalendarioComponentProps) {
  const today = moment().format(DATE_FORMAT);
  const [selectedDay, setSelectedDay] = useState<string>('');

  const markedDates: { [key: string]: any } = {
    [today]: { marked: true, dotColor: colors.primary },
  };
  if (selectedDay) {
    markedDates[selectedDay] = {
      ...(markedDates[selectedDay] || {}),
      selected: true,
      selectedColor: colors.primary,
    };
  }

  function onDaySelect(day: DateData) {
    const dia = moment(day.dateString).format(DATE_FORMAT);
    setSelectedDay(dia);
    props.diaSelecionado(dia);
  }

  return (
    <View style={styles.container}>
      <Calendar
        minDate={today}
        onDayPress={onDaySelect}
        markedDates={markedDates}
        theme={{
          backgroundColor: colors.surface,
          calendarBackground: colors.surface,
          textSectionTitleColor: colors.textSecondary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.textOnPrimary,
          todayTextColor: colors.primary,
          dayTextColor: colors.textPrimary,
          textDisabledColor: colors.textMuted,
          dotColor: colors.primary,
          arrowColor: colors.primary,
          monthTextColor: colors.textPrimary,
          textMonthFontWeight: '700',
          textDayFontWeight: '500',
        }}
      />
    </View>
  );
}
