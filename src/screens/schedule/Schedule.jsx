import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './schedule.style';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ptBR } from '../../constants/calendar';
import { useState } from 'react';
import Button from '../../components/button/Button';
import API from '../../constants/api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function Schedule(props) {
  const id_barber = props.route.params.id_barber;
  const selectedServices = props.route.params.selectedServices;
  const totalPrice = props.route.params.totalPrice;
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedHour, setSelectedHour] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

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

  async function ClickBooking() {
    try {
      const response = await API.post('/appointments', {
        id_barber,
        id_services: selectedServices,
        booking_date: selectedDate,
        booking_hour: selectedHour,
        total_price: totalPrice,
      });
      if (response.data?.id_appointment) {
        Alert.alert('Agendamento realizado com sucesso!');
        console.log('Agendamento:', response.data);
        props.navigation.navigate('main', { screen: 'Agendamentos' });
      }
    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response.data.error);
        console.log('Erro ao agendar serviço:', error);
      } else {
        Alert.alert('Erro ao agendar serviços');
      }
    }
  }

  return (
    <View style={styles.container}>
      <View>
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
              <Text style={styles.textHour}>{ selectedHour || 'Selecione o horário'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideTimePicker}
            />
          </View>
        
      </View>
      <View>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
        </Text>
        <Button title="Confirmar agendamento" onPress={ClickBooking} disabled={!selectedHour} />
      </View>
    </View>
  );
}