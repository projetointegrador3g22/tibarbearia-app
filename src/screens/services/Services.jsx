import { Alert, FlatList, Image, Text, View } from 'react-native';
import { styles } from './services.style';
import Service from '../../components/service/Service';
import API from '../../constants/api';
import { useEffect, useState } from 'react';

export default function Services(props) {
  const name = props.route.params.name;
  const avatar = props.route.params.avatar;
  const id_barber = props.route.params.id;

  const [services, setServices] = useState([]);

  function ClickService(id_service) {
    props.navigation.navigate('schedule', { id_barber, id_service });
  }

  async function getServices() {
    try {
      const response = await API.get(`/barbers/${id_barber}/services`);
      if (response.data) {
        setServices(response.data);
        console.log('Serviços:', response.data);
      }
    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response.data.error);
        console.log('Erro ao buscar serviços:', error);
      } else {
        Alert.alert('Erro ao buscar serviços');
      }
    }
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image source={avatar} style={{ width: 60, height: 70 }} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <FlatList
        data={services}
        keyExtractor={(service) => service.id_service}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Service
            id_service={item.id_service}
            service={item.description}
            price={item.price}
            onPress={ClickService}
          />
        )}
      />
    </View>
  );
}
