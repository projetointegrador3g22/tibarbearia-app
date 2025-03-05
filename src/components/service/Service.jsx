import { Text, View } from 'react-native';
import Button from '../button/Button';
import { styles } from './service.style';

export default function Service(props) {

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(props.price)

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.service}>{props.service}</Text>
        <Text style={styles.price}>
          {formattedPrice}
        </Text>
      </View>
      <View style={styles.containerButton}>
        <Button
          title="Agendar"
          onPress={() => props.onPress(props.id_service)}
          disabled={false}
        />
      </View>
    </View>
  );
}
