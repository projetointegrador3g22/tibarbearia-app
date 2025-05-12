import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './client.style';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import Button from '../button/Button';

export default function ServiceAndValue(props) {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.barber}>
      <View style={styles.barberContent}>
        <Image source={props.icon} style={styles.avatar} />
        <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 5 }}>
          <Text style={styles.name}>{props.description}</Text>
          <Text style={styles.name}>R${props.price},00</Text>
        </View>
      </View>

      {user.isAdmin === true && (
        <View style={styles.containerButton}>
          <Button
            style={styles.button}
            title={props.editIcon}
            onPress={props.onEdit}
          />
         <Button
            style={styles.button}
            title={props.deleteIcon}
            type="danger"
            onPress={props.onDelete}
          />
        </View>
      )}
    </View>
  );
}
