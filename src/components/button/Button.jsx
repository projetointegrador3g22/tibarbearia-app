import { Text, TouchableOpacity } from 'react-native';
import { styles } from './button.style';

export default function Button({ title, onPress, type, disabled }) {
  return (
    <TouchableOpacity style={[styles.btn, type == 'danger' ? styles.danger : styles.primary]} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
