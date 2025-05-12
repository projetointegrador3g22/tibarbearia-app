import { View } from 'react-native';
import { styles } from './profile.style';
import Button from '../../components/button/Button';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';

export default function Admin(props) {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {user.isAdmin && (
          <Button
          title="Barbeiros"
          type="primary"
          onPress={() => {
            props.navigation.navigate('barbers');
          }}
        />
        )}
        <Button
          title="Clientes"
          type="primary"
          onPress={() => {
            props.navigation.navigate('clients');
          }}
        />
        <Button
          title="Serviços e Valores"
          type="primary"
          onPress={() => {
            props.navigation.navigate('servicesAndValues');
          }}
        />
      </View>
    </View>
  );
}
