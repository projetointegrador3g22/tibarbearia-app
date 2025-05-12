import { Alert, FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './services.style';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth';
import icon from '../../constants/icon';
import { FontAwesome } from '@expo/vector-icons';

export default function Services(props) {
  const {barber, getBarberData, loadAvailableServices, user, client, getClientData} = useContext(AuthContext);

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [barberServices, setBarberServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const validateProfile = user.perfil === 'Cliente';
 

  // Carrega os dados do barbeiro e serviços disponíveis
// useEffect(() => {
//     const loadData = async () => {
//       try {
//         // 1. Carrega os dados completos do barbeiro
//         await getBarberData(user.perfil === 'Cliente' ? props.route.params.id : user.uid);
        
//         // 2. Carrega todos os serviços disponíveis
//         const allServices = await loadAvailableServices();
//         setServices(allServices);
        
//         // 3. Filtra apenas os serviços que este barbeiro oferece
//        const barberServicesToUse = validateProfile ? barber?.servicos : user?.servicos;

// if (barberServicesToUse?.length) {
//   const filteredServices = allServices.filter(service => 
//     barberServicesToUse.some(s => 
//       typeof s === 'string' ? s === service.servicoId : s.servicoId === service.servicoId
//     )
//   );
//   setBarberServices(filteredServices);
// } else {
//   console.log('Nenhum serviço encontrado para:', validateProfile ? 'barbeiro' : 'usuário');
//   setBarberServices([]);
// }

//       } catch (error) {
//   console.error('Erro ao carregar serviços:', {
//     error,
//     userData: user,
//     barberData: barber,
//     allServices
//   });
//   Alert.alert('Erro', 'Não foi possível carregar os serviços');
//   setBarberServices([]); // Garante que o estado seja limpo em caso de erro
// }
//     };

//     loadData();
//   }, [barber]);
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      
      // 1. Carrega dados do barbeiro (se for cliente) ou do usuário (se for barbeiro)
      if (validateProfile) {
        await getBarberData(props.route.params.id);
      }

      // 2. Carrega todos os serviços disponíveis
      const allServices = await loadAvailableServices();
      setServices(allServices);

      // 3. Determina quais serviços filtrar
      const servicesToFilter = validateProfile 
        ? barber?.servicos || []
        : user?.servicos || [];

      // 4. Filtra os serviços (com tratamento para ambos os formatos: array de IDs ou objetos)
      const filteredServices = allServices.filter(service => {
        return servicesToFilter.some(item => 
          typeof item === 'string' 
            ? item === service.servicoId 
            : item.servicoId === service.servicoId
        );
      });

      setBarberServices(filteredServices);

    } catch (error) {
      console.error('Erro ao carregar serviços:', {
        error,
        userData: user,
        barberData: barber,
        validateProfile
      });
      Alert.alert('Erro', 'Não foi possível carregar os serviços');
      setBarberServices([]);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [validateProfile, barber?.servicos, user?.servicos]); // Dependências otimizadas

{!validateProfile &&   useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Carrega os dados completos do cliente
        await getClientData(props.route.params.clienteId);

      } catch (error) {
        Alert.alert('Erro', error);
        console.error('Erro ao carregar dados do cliente:', error);
      }
    };

    loadData();
  }, [client]);}

  // Atualiza o preço total quando os serviços selecionados mudam
  useEffect(() => {
    const newTotal = selectedServices.reduce((sum, serviceId) => {
      const service = services.find(s => s.servicoId === serviceId);
      return sum + (service?.preco || 0);
    }, 0);
    setTotalPrice(newTotal);
  }, [selectedServices, services]);

  const toggleServiceSelection = (servicoId) => {
    setSelectedServices(prev => 
      prev.includes(servicoId)
        ? prev.filter(id => id !== servicoId)
        : [...prev, servicoId]
    );
  };

  // const handleSchedule = () => {
  //   if (selectedServices.length === 0) {
  //     Alert.alert('Atenção', 'Selecione pelo menos um serviço');
  //     return;
  //   }
  //   // Navega para a tela de agendamento com os dados necessários
  //   props.navigation.navigate('schedule', {
      
  //     barbeiroId: validateProfile ? props.route.params.id : user.uid,
  //     barbeiroNome: validateProfile ? barber?.nome || 'Barbeiro' : user.nome,
  //     selectedServices: selectedServices.map(serviceId => {
  //       const service = services.find(s => s.servicoId === serviceId);
  //       return {
  //         servicoId: service.servicoId,
  //         descricao: service.descricao,
  //         preco: service.preco
  //       };
  //     }),
  //     totalPrice,
  //     clienteNome: !validateProfile ? client?.nome : user.nome,
  //     clienteWhatsapp: !validateProfile ? client?.whatsapp : user.whatsapp,
  //     clienteId: !validateProfile ? props.route.params.clienteId : user.uid,
  //   });
  // };

//   const handleSchedule = () => {
//   if (selectedServices.length === 0) {
//     Alert.alert('Atenção', 'Selecione pelo menos um serviço');
//     return;
//   }

//   console.log('[DEBUG] Dados antes da navegação:', {
//     barbeiroId: validateProfile ? props.route.params.id : user?.uid,
//     barbeiroNome: validateProfile ? barber?.nome : user?.nome,
//     selectedServices,
//     totalPrice,
//     clienteNome: !validateProfile ? client?.nome : user?.nome,
//     clienteWhatsapp: !validateProfile ? client?.whatsapp : user?.whatsapp,
//     clienteId: !validateProfile ? props.route.params.clienteId : user?.uid
//   });

//   // Verificação obrigatória antes de navegar
//   if (
//     !props.route.params?.clienteId && 
//     !validateProfile && 
//     !user?.uid
//   ) {
//     Alert.alert('Erro', 'ID do cliente não encontrado');
//     return;
//   }

//   props.navigation.navigate('schedule', {
//     barbeiroId: validateProfile ? props.route.params.id : user?.uid,
//     barbeiroNome: validateProfile ? barber?.nome || 'Barbeiro' : user?.nome,
//     selectedServices: selectedServices.map(serviceId => {
//       const service = services.find(s => s.servicoId === serviceId);
//       if (!service) {
//         console.error('Serviço não encontrado:', serviceId);
//         throw new Error(`Serviço ${serviceId} não encontrado`);
//       }
//       return {
//         servicoId: service.servicoId,
//         descricao: service.descricao,
//         preco: service.preco
//       };
//     }),
//     totalPrice,
//     clienteNome: !validateProfile ? client?.nome : user?.nome,
//     clienteWhatsapp: !validateProfile ? client?.whatsapp : user?.whatsapp,
//     clienteId: !validateProfile ? props.route.params.clienteId : user?.uid,
//   });
// };
const handleSchedule = () => {
  if (selectedServices.length === 0) {
    Alert.alert('Atenção', 'Selecione pelo menos um serviço');
    return;
  }

  // Verificação EXTRA do barbeiroId
  const barbeiroId = validateProfile ? props.route.params.id : user?.uid;
  if (!barbeiroId) {
    Alert.alert('Erro', 'ID do barbeiro não encontrado. Faça login novamente.');
    return;
  }

  props.navigation.navigate('schedule', {
    barbeiroId, // ← Garantido agora
    barbeiroNome: validateProfile ? barber?.nome || 'Barbeiro' : user?.nome,
    selectedServices: selectedServices.map(serviceId => {
      const service = services.find(s => s.servicoId === serviceId);
      return {
        servicoId: service.servicoId,
        descricao: service.descricao,
        preco: service.preco
      };
    }),
    totalPrice,
    clienteNome: !validateProfile ? client?.nome : user?.nome,
    clienteWhatsapp: !validateProfile ? client?.whatsapp : user?.whatsapp,
    clienteId: !validateProfile ? props.route.params.clienteId : user?.uid,
  });
};
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        {validateProfile ? 
        <Image source={icon.logo} style={{ width: 60, height: 70 }} /> : <Image source={icon.client} style={{ width: 60, height: 70 }} />
        }
        
        <Text style={styles.name}>{validateProfile ? barber?.nome : client?.nome}</Text>
        <Text style={styles.text}><FontAwesome
            style={styles.icon}
            color={'green'}
            name="whatsapp"
            size={18}
          /> {validateProfile ? barber?.whatsapp : client?.whatsapp}</Text>
      </View>
      <Text style={styles.servicesTitle}>Selecione o(s) serviço(s) desejado(s):</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.servicoId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.containerCheck}
            onPress={() => toggleServiceSelection(item.servicoId)}
            disabled={!barberServices.some(s => s.servicoId === item.servicoId)}
          >
            <View style={[
              styles.check, 
              {
                backgroundColor: selectedServices.includes(item.servicoId)
                  ? '#2E66E7'
                  : 'transparent',
                opacity: barberServices.some(s => s.servicoId === item.servicoId) ? 1 : 0.5
              }
            ]}>
              {selectedServices.includes(item.servicoId) && (
                <Text style={styles.checked}>✓</Text>
              )}
            </View>
            <Text style={[
              styles.service,
              !barberServices.some(s => s.servicoId === item.servicoId) && styles.disabledService
            ]}>
              {item.descricao} - {new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(item.preco)}
              {!barberServices.some(s => s.servicoId === item.servicoId) ? (
                <Text style={styles.notAvailable}> (Não disponível)</Text>
              ) : <Text style={styles.available}> (Disponível)</Text>}
            </Text>
          </TouchableOpacity>
        )}
      />
       <View style={styles.containerTotalPrice}>
        <Text style={styles.totalPrice}>
          Total: {new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(totalPrice)}
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            selectedServices.length === 0 && styles.disabledButton
          ]}
          onPress={handleSchedule}
          disabled={selectedServices.length === 0}
        >
          <Text style={styles.buttonText}>Agendar Serviço(s)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}