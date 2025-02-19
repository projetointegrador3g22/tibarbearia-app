import { Text, View } from 'react-native';
import { styles } from './appointment.style';
import Button from '../button/Button';

export default function Appointment(props) {
  const formattedDate = props.date && props.time ? new Date(`${props.date}T${props.time}`) : null; // Verifica se props.date e props.time existem
  return (
    <View style={styles.appointment}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.service}>{props.services}</Text>
      <View style={styles.container}>
        <View style={styles.containerBooking}>
          <View style={styles.booking}>
            <View style={styles.icon}>{props.dateIcon}</View>
            <Text style={styles.date}>{formattedDate ? formattedDate.toLocaleDateString() : 'Data não definida'}</Text>
          </View>
          <View style={styles.booking}>
            <View style={styles.icon}>{props.timeIcon}</View>
            <Text style={styles.time}>{props.time || 'Hora não definida'}</Text>
          </View>
        </View>
        <View style={styles.containerButton}>
          <Button
            title="Cancelar Agendamento"
            type="danger"
            onPress={() => props.onPress(props.id_appointment)}
          />
        </View>
      </View>
    </View>
  );
}
