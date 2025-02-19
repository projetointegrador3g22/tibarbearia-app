import { Alert, Text, View } from 'react-native';
import { styles } from './schedule.style';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ptBR } from '../../constants/calendar';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/button/Button';
import API from '../../constants/api';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function Schedule(props) {
  //Projeto calendário: https://github.com/wix/react-native-calendars

  const id_barber = props.route.params.id_barber;
  const id_service = props.route.params.id_service;
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [selectedHour, setSelectedHour] = useState('');
  const [hours, setHours] = useState([]);

  async function getHours() {
    try {
      const response = await API.get(`/appointments/hours`);
      console.log("Horários recebidos:", response.data);
      setHours(response.data);

      if (response.data.length > 0){
        setSelectedHour(response.data[0].value);
      }
    } catch (error) {
      console.error('Erro ao buscar horários:', error);
      setHours([]);
    }
  }

  useEffect(() => {
    getHours();
  }, [selectedDate]);

  async function ClickBooking() {
    try {
      const response = await API.post(`/appointments`, {
        id_barber,
        id_service,
        booking_date: selectedDate,
        booking_hour: selectedHour,
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
        <View>
          <Text style={styles.textHour}>Horário</Text>
        </View>
        <View>
         
          <Picker
            selectedValue={selectedHour}
            onValueChange={(itemValue) => setSelectedHour(itemValue)}
          >
            {hours.length > 0 ? (
              hours.map((hour) => (
                <Picker.Item key={hour.id_hour} label={hour.value} value={hour.value} />
              ))
            ) : (
              <Picker.Item label="Nenhum horário disponível" value="" />
            )}
          </Picker>
        </View>
      </View>
      <View>
        <Button title="Confirmar agendamento" onPress={ClickBooking} />
      </View>
    </View>
  );
}
