import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './home.style';
import Barber from '../../components/barber/Barber';
import icon from '../../constants/icon';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth';

export default function Home(props) {
  const { 
    user, 
    getBarbers, 
    loadAvailableServices, 
    updateBarberServices 
  } = useContext(AuthContext);
  
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  function ClickBarber(id, name, whatsapp) {
    props.navigation.navigate('services', { id, name, whatsapp });
  }

  const toggleServiceSelection = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user.perfil === 'Cliente') {
          const barbersData = await getBarbers();
          setBarbers(barbersData);
        } else {
          const servicesData = await loadAvailableServices();
          setServices(servicesData);
          
          // Inicializa os serviços selecionados com os que o barbeiro já oferece
          if (user.servicos) {
            setSelectedServices(user.servicos);
          }
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {marginBottom: 20}]}>
        {user.perfil === 'Cliente' ? 'Escolha um profissional' : 'Selecione um ou mais serviços'}
      </Text>

      {user.perfil === 'Cliente' ? (
        <FlatList
          data={barbers}
          keyExtractor={(barber) => barber.barbeiroId}
          renderItem={({ item }) => (
            <Barber
              name={item.nome}
              avatar={icon.logo}
              onPress={() => ClickBarber(item.barbeiroId, item.nome, item.whatsapp)}
            />
          )}
        />
      ) : (
        <>
          <FlatList
            data={services}
            keyExtractor={(service) => service.servicoId}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.containerCheck}
                onPress={() => toggleServiceSelection(item.servicoId)}
              >
                <View style={[
                  styles.check, 
                  {
                    backgroundColor: selectedServices.includes(item.servicoId)
                      ? '#2E66E7'
                      : 'transparent',
                  }
                ]}>
                  {selectedServices.includes(item.servicoId) && (
                    <Text style={styles.checked}>✓</Text>
                  )}
                </View>
                <Text style={styles.service}>
                  {item.descricao} - {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(item.preco)}
                </Text>
              </TouchableOpacity>
            )}
          />
          
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                if (selectedServices.length === 0) {
                  Alert.alert('Atenção', 'Selecione pelo menos um serviço');
                  return;
                }
                try {
                  await updateBarberServices(selectedServices);
                  Alert.alert('Sucesso', 'Serviços atualizados com sucesso!');
                } catch (error) {
                  Alert.alert('Erro', 'Não foi possível salvar as alterações');
                }
              }}
            >
              <Text style={styles.buttonText}>Salvar Serviços</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}