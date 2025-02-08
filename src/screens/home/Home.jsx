import { Alert, FlatList, Text, View } from 'react-native';
import { styles } from './home.style';
import Barber from '../../components/barber/Barber';
import icon from '../../constants/icon';
import { useEffect, useState } from 'react';
import API from '../../constants/api';

export default function Home(props) {
  const [barbers, setBarbers] = useState([]);

  function ClickBarber(id, name, avatar) {
    props.navigation.navigate('services', { id, name, avatar });
  }

  async function getBarbers() {
    try {
      const response = await API.get('/barbers');

      if (response.data) {
        setBarbers(response.data);
      }
    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response.data.error);
      } else {
        Alert.alert('Erro ao buscar barbeiros');
      }
    }
  }

  useEffect(() => {
    getBarbers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Escolha um profissional</Text>
      <FlatList
        data={barbers}
        keyExtractor={(barber) => barber.id_barber}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Barber
            name={item.name}
            avatar={icon.logo}
            id={item.id_barber}
            onPress={ClickBarber}
          />
        )}
      />
    </View>
  );
}
