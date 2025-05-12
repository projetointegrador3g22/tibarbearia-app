import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './client.style';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import Button from '../button/Button';

export default function Client(props) {
  const { user } = useContext(AuthContext);
  return (
    <TouchableOpacity
      style={styles.barber}
      onPress={() => props.onPress(props.id, props.name, props.avatar)}
    >
      <View style={styles.barberContent}>
        <Image source={props.avatar} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{props.name}</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        {props.viewIcon && (
          <Button
            style={[styles.button, { backgroundColor: 'green' }]}
            title={props.viewIcon}
            // type="danger"
            onPress={() => props.onPress(props.id_appointment)}
          />
        )}
        {user.isAdmin && props.editIcon && (
          <Button
            style={styles.button}
            title={props.editIcon}
            // type="danger"
            onPress={() => props.onPress(props.id_appointment)}
          />
        )}
        {user.isAdmin && props.deleteIcon && (
          <Button
            style={styles.button}
            title={props.deleteIcon}
            type="danger"
            onPress={() => props.onPress(props.id_appointment)}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
