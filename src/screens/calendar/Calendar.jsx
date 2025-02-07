import { FlatList, Text, View } from 'react-native';
import { styles } from './calendar.style';
import { appointments } from '../../constants/data';
import Appointment from '../../components/appointment/Appointment';
import icon from '../../constants/icon';
import API from '../../constants/api';
import { use, useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Calendar() {
  const [appointments, setAppointments] = useState([]);

  // useEffect(() => {
  //   getAppointments();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getAppointments();
    }, [])
  );

  async function getAppointments() {
    try {
      const response = await API.get('/appointments');
      if (response.data) {
        console.log('Agendamentos:', response.data);
        setAppointments(response.data);
      }
    } catch (error) {
      console.log('Erro ao buscar agendamentos:', error);
    }
  }

  async function deleteAppointment(id_appointment) {
    try {
      const response = await API.delete(`/appointments/${id_appointment}`);
      // if (response.data.id_appointment) {
        console.log('Agendamento deletado:', response.data);
        getAppointments();
      // }
    } catch (error) {
      console.log('Erro ao deletar agendamento:', error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(appointment) => appointment.id_appointment}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Appointment
            id_appointment={item.id_appointment}
            name={item.barber}
            services={item.service}
            date={item.date}
            time={item.hour}
            dateIcon={icon.dateIcon}
            timeIcon={icon.timeIcon}
            onPress={deleteAppointment}
          />
        )}
      />
    </View>
  );
}
