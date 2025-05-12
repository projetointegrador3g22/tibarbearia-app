import { Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import { styles } from './home.style';
import { AuthContext } from '../../../context/auth';
import { useContext, useEffect, useState } from 'react';
import Client from '../../../components/client/Client';
import icon from '../../../constants/icon';

export default function Clients(props) {
  const { 
     user, 
     getClients, 
   } = useContext(AuthContext);
   
   const [clients, setClients] = useState([]);
   const [loading, setLoading] = useState(true);
   const agendar = props.route.params?.agendar;
 
   function clickClient(clienteId, nome, emailContato, whatsapp) {
    if (agendar === true) {
props.navigation.navigate('services', { clienteId});
    } else {
props.navigation.navigate('addClient', { clienteId, nome, emailContato, whatsapp });
    }
     
   }
 
 
   useEffect(() => {
     const loadData = async () => {
       try {
         if (user) {
           const clientsData = await getClients();
           setClients(clientsData);
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
      {user.isAdmin ? (
              <View>
                <View style={styles.plus}>
                  <Text>{icon.plusIcon}</Text>
                  <Text>Novo Cliente</Text>
                </View>
                <Text style={{ height: 0.1, backgroundColor: 'black' }}></Text>
              </View>
            ) : (
              <View>
                <Text style={styles.text}>{agendar === true ? 'Escolha seu Cliente' : 'Nossos Clientes'}</Text>
      
                <Text
                  style={{ height: 0.1, backgroundColor: 'black', marginTop: 10 }}
                ></Text>
              </View>
            )}
     
         <FlatList
           data={clients}
           keyExtractor={(client) => client.clienteId}
           renderItem={({ item }) => (
             <Client
               name={item.nome}
               avatar={icon.client}
               onPress={() => clickClient(item.clienteId, item.nome, item.emailContato, item.whatsapp)}
               editIcon={icon.editIcon}
               viewIcon={agendar === false && icon.viewIcon}
             />
           )}
         />
     
     </View>
   );
}
