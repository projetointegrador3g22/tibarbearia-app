import { Alert, FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './services.style';
import API from '../../constants/api';
import { useEffect, useState } from 'react';

export default function Services(props) {
  const name = props.route.params.name;
  const avatar = props.route.params.avatar;
  const id_barber = props.route.params.id;

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const toggleServiceSelection = (id_service, price) => {
    if (selectedServices.includes(id_service)) {
      setSelectedServices(selectedServices.filter((id) => id !== id_service));
      setTotalPrice(totalPrice - price);

    } else {
      setSelectedServices([...selectedServices, id_service]);
      setTotalPrice(totalPrice + price);

    }
  };

  const handleSchedule = () => {
    if (selectedServices.length === 0) {
      Alert.alert('Selecione pelo menos um serviço.');
      return;
    }
    props.navigation.navigate('schedule', {
      id_barber,
      selectedServices,
      totalPrice,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image source={avatar} style={{ width: 60, height: 70 }} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.servicesTitle}>Selecione o(s) serviço(s) desejado(s):</Text>
      <FlatList
        data={services}
        keyExtractor={(service) => service.id_service.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.containerCheck}
            onPress={() => toggleServiceSelection(item.id_service, item.price)}
          >
            <View
              style={[styles.check, {
                backgroundColor: selectedServices.includes(item.id_service)
                  ? '#2E66E7'
                  : 'transparent',
              }]}
            >
              {selectedServices.includes(item.id_service) && (
                <Text style={styles.checked}>✓</Text>
              )}
            </View>
            <Text style={styles.service}>{item.description} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.containerTotalPrice}>
        <Text style={styles.totalPrice}>Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSchedule}
        >
          <Text style={styles.buttonText}>Agendar Serviço(s)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}