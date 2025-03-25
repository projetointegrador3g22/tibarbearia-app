import { Alert, FlatList, Text, View } from 'react-native';
import { styles } from './calendar.style';
import Appointment from '../../components/appointment/Appointment';
import icon from '../../constants/icon';
import API from '../../constants/api';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ModalCustom from '../../components/modal/ModalCustom';

export default function Calendar() {
  const [appointments, setAppointments] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [appointmentToDelete, setAppointmentToDelete] = useState(null); // Armazena o ID do agendamento a deletar

  useFocusEffect(
    useCallback(() => {
      getAppointments();
    }, []),
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

  async function handleDeleteAppointment() {
    try {
      const response = await API.delete(`/appointments/${appointmentToDelete}`);
      Alert.alert('Agendamento cancelado com sucesso!');
      getAppointments();
    } catch (error) {
      console.log('Erro ao deletar agendamento:', error);
    } finally {
      setIsModalVisible(false); // Fecha o modal independentemente do resultado
    }
  }

  const showModal = (id_appointment) => {
    setModalText('Deseja cancelar este agendamento?');
    setIsModalVisible(true);
    setAppointmentToDelete(id_appointment); // Define o ID do agendamento a deletar
  };

  const handleConfirm = () => {
    if (appointmentToDelete) {
      handleDeleteAppointment();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAppointmentToDelete(null); // Limpa o ID se o usuário cancelar
  };

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
          price={item.total_price}
          dateIcon={icon.dateIcon}
          timeIcon={icon.timeIcon}
          onPress={() => showModal(item.id_appointment)}
        />
      )}
    />

      <ModalCustom
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        text={modalText}
        cancelButtonText="Cancelar"
        confirmButtonText="Confirmar"
      />
    </View>
  );
}
