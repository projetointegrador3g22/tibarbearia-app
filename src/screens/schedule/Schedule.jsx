import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './schedule.style';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ptBR } from '../../constants/calendar';
import { useContext, useState } from 'react';
import API from '../../constants/api';
import uuid from 'react-native-uuid';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { AuthContext } from '../../context/auth';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function Schedule(props) {
  const { createAppointment, user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [selectedHour, setSelectedHour] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    setSelectedHour(moment(time).format('HH:mm'));
    hideTimePicker();
  };

  
  // async function ClickBooking() {
  //   if (!selectedHour) {
  //     Alert.alert('Atenção', 'Selecione um horário');
  //     return;
  //   }
  
  //   setLoading(true);
    
  //   try {
  //     // Prepara os dados do agendamento
  //     const agendamentoData = {
  //       barbeiroId: props.route.params.barbeiroId,
  //       barbeiroNome: props.route.params.barbeiroNome,
  //       clienteNome: props.route.params.clienteNome,
  //       clienteWhatsapp: props.route.params.clienteWhatsapp,
  //       servicos: props.route.params.selectedServices,
  //       data: selectedDate,
  //       hora: selectedHour,
  //       precoTotal: props.route.params.totalPrice,
  //       clienteId: props.route.params.clienteId,
  //     };
  
  //     // Chama a função de criação
  //     await createAppointment(agendamentoData);
      
  //     Alert.alert('Sucesso', 'Agendamento realizado com sucesso!');
  //     props.navigation.navigate('main', { screen: 'Agendamentos' });
  //   } catch (error) {
  //     console.error('Erro ao criar agendamento:', error);
  //     Alert.alert('Erro', error.message || 'Não foi possível completar o agendamento');
  //   } finally {
  //     setLoading(false);
  //   }
  // }
async function ClickBooking() {
  // Verificação EXTRA do barbeiroId
  if (!props.route.params?.barbeiroId) {
    Alert.alert(
      'Erro', 
      'Identificação do barbeiro perdida. Volte e tente novamente.'
    );
    return;
  }
  console.log('[DEBUG] Dados da rota:', props.route.params);
  
  if (!props.route.params) {
    Alert.alert('Erro', 'Dados do agendamento não encontrados');
    return;
  }

  // Verificação dos parâmetros essenciais
  const requiredParams = [
    'barbeiroId',
    'clienteId',
    'selectedServices',
    'totalPrice'
  ];

  const missingParams = requiredParams.filter(
    param => !props.route.params[param]
  );

  if (missingParams.length > 0) {
    Alert.alert(
      'Erro',
      `Dados incompletos: ${missingParams.join(', ')}`
    );
    return;
  }

  setLoading(true);
  
  try {
    const agendamentoData = {
      barbeiroId: props.route.params.barbeiroId,
      barbeiroNome: props.route.params.barbeiroNome,
      clienteNome: props.route.params.clienteNome,
      clienteWhatsapp: props.route.params.clienteWhatsapp,
      servicos: props.route.params.selectedServices,
      data: selectedDate,
      hora: selectedHour,
      precoTotal: props.route.params.totalPrice,
      clienteId: props.route.params.clienteId,
    };

    await createAppointment(agendamentoData);
    Alert.alert('Sucesso', 'Agendamento realizado com sucesso!');
    props.navigation.navigate('main', { screen: 'Agendamentos' });
  } catch (error) {
    console.error('Erro completo:', error);
    Alert.alert('Erro', error.message || 'Falha ao criar agendamento');
  } finally {
    setLoading(false);
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <Calendar
          theme={styles.theme}
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#2E66E7' },
          }}
          minDate={new Date().toDateString()}
        />

        <View style={styles.containerHour}>
          <TouchableOpacity onPress={showTimePicker} style={styles.input}>
            <Text style={styles.textHour}>
              {selectedHour || 'Clique aqui e selecione o horário'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
          />
        </View>
      </View>
      <View style={styles.containerTotalPrice}>
        <Text style={styles.totalPrice}>
          Total:{' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(props.route.params.totalPrice)}
        </Text>
        <TouchableOpacity
          style={[styles.button, !selectedHour && styles.disabledButton]}
          onPress={ClickBooking}
          disabled={!selectedHour}
        >
          <Text style={styles.buttonText}>Confirmar Agendamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
