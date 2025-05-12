import {
  Alert,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { styles } from './calendar.style';
import Appointment from '../../components/appointment/Appointment';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ModalCustom from '../../components/modal/ModalCustom';
import { AuthContext } from '../../context/auth';
import icon from '../../constants/icon';
import { FontAwesome } from '@expo/vector-icons';

export default function Calendar(props) {
  const { getAppointments, deleteAppointment, user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [hideText, setHideText] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // Carrega os agendamentos quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      const loadAppointments = async () => {
        try {
          setLoading(true);
          const appointmentsData = await getAppointments();
          setAppointments(appointmentsData);
        } catch (error) {
          console.error('Erro ao carregar agendamentos:', error);
          Alert.alert('Erro', 'Não foi possível carregar os agendamentos');
        } finally {
          setLoading(false);
        }
      };

      loadAppointments();
    }, []),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 50, // move para a direita
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0, // desaparece
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setHideText(true); // depois da animação, remove o texto
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  async function handleDeleteAppointment() {
    try {
      await deleteAppointment(appointmentToDelete);
      // Atualiza a lista após deletar
      const updatedAppointments = await getAppointments();
      setAppointments(updatedAppointments);
      Alert.alert('Sucesso', 'Agendamento cancelado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      Alert.alert('Erro', 'Não foi possível cancelar o agendamento');
    } finally {
      setIsModalVisible(false);
      setAppointmentToDelete(null);
    }
  }

  const showModal = (agendamentoId) => {
    setModalText(
      'Deseja realmente excluir este agendamento?\nEsta ação não pode ser desfeita!',
    );
    setAppointmentToDelete(agendamentoId);
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    if (appointmentToDelete) {
      handleDeleteAppointment();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAppointmentToDelete(null);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E66E7" />
      </View>
    );
  }

  const handleNewAppointment = () => {
    if (user.perfil === 'Barbeiro') {
      props.navigation.navigate('clients', {
        agendar: true,
      });
    }
    if (user.perfil === 'Cliente') {
      props.navigation.navigate('main', { screen: 'Barbeiros' });
    }
  };

  const newAppointmentButton = (
    <TouchableOpacity
      style={styles.iconPlusContainer}
      onPress={handleNewAppointment}
    >
      <FontAwesome
        name="plus-circle"
        size={25}
        color="black"
        style={styles.iconPlus}
      />
      {!hideText && (
        <Animated.Text
          style={[
            styles.textPlus,
            {
              transform: [{ translateX }],
              opacity,
            },
          ]}
        >
          Novo Agendamento
        </Animated.Text>
      )}
    </TouchableOpacity>
  );

  if (appointments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum agendamento encontrado</Text>
        {newAppointmentButton}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.agendamentoId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Appointment
            id_appointment={item.agendamentoId}
            personIcon={
              user.perfil === 'Barbeiro' ? icon.userIcon : icon.cutIcon
            }
            name={
              user.perfil === 'Barbeiro' ? item.clienteNome : item.barbeiroNome
            }
            services={item.servicos
              .map((service) => service.descricao)
              .join(', ')}
            date={item.data}
            time={item.hora}
            price={item.precoTotal}
            dateIcon={icon.dateIcon}
            timeIcon={icon.timeIcon}
            onPress={() => showModal(item.agendamentoId)}
            delete={icon.deleteIcon}
            edit={user.perfil === 'Barbeiro' && icon.editIcon}
            check={user.perfil === 'Barbeiro' && icon.checkIcon}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <ModalCustom
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        text={modalText}
        cancelButtonText="Cancelar"
        confirmButtonText="Confirmar"
        confirmButtonType="danger"
      />

      {newAppointmentButton}
    </View>
  );
}
