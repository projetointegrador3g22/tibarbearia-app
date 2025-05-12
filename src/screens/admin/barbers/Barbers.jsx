import { Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import { styles } from './home.style';
import { AuthContext } from '../../../context/auth';
import { useContext, useEffect, useState } from 'react';
import Barber from '../../../components/barber/Barber';
import icon from '../../../constants/icon';

export default function Barbers(props) {
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
 
 
   useEffect(() => {
     const loadData = async () => {
       try {
         if (user.isAdmin === true) {
           const barbersData = await getBarbers();
           setBarbers(barbersData);
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
       <View>
               <View style={styles.plus}>
                 <Text>{icon.plusIcon}</Text>
                 <Text>Novo barbeiro</Text>
               </View>
               <Text style={{height: 0.1, backgroundColor: 'black'}}></Text></View>
       {user.isAdmin === true && (
         <FlatList
           data={barbers}
           keyExtractor={(barber) => barber.barbeiroId}
           renderItem={({ item }) => (
             <Barber
               name={item.nome}
               avatar={icon.logo}
               onPress={() => ClickBarber(item.barbeiroId)}
               editIcon={icon.editIcon}
              //  deleteIcon={icon.deleteIcon}
              //  viewIcon={icon.viewIcon}
             />
           )}
         />
       )}
     </View>
   );
}
