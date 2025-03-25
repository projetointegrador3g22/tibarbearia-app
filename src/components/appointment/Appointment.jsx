import { Text, View } from 'react-native';
import { styles } from './appointment.style';
import Button from '../button/Button';

export default function Appointment(props) {
  const formattedDate = props.date && props.time ? new Date(`${props.date}T${props.time}`) : null;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(props.price)

  return (
    <View style={styles.appointment}>
      <View style={styles.top}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.price}>{formattedPrice}</Text>

      </View>
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