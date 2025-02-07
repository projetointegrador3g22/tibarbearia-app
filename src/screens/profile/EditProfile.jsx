import { Alert, Text, TextInput, View } from 'react-native';
import { styles } from './editProfile.style';
import { AuthContext } from '../../context/auth';
import { useContext, useState } from 'react';
import Button from '../../components/button/Button';
import API from '../../constants/api';

export default function EditProfile(props) {
  const { user, setUser } = useContext(AuthContext);

  const [newEmail, setNewEmail] = useState(user.email);
  const [newWhatsapp, setNewWhatsapp] = useState(user.whatsapp);

  async function editProfile() {
    try {
      if (newEmail !== user.email && newEmail !== null) user.email = newEmail;
      if (newWhatsapp !== user.whatsapp && newWhatsapp !== null) user.whatsapp = newWhatsapp;
      const response = await API.put(`/users/${user.id_user}`, { email: user.email, whatsapp: user.whatsapp });
     
      if (response.data?.id_user) {
        Alert.alert('Perfil atualizado com sucesso!');
        setUser(response.data);
        console.log('Novo usuário:', response.data);
        

        // 🔹 Buscar os dados atualizados
      const updatedUser = await API.get(`/users/profile`);
      
      if (updatedUser.data) {
        setUser(updatedUser.data); // 🔹 Atualiza o usuário no contexto com os dados completos
      }

        // 🔹 Aguarda um pouco para garantir atualização antes da navegação
        setTimeout(() => {
          props.navigation.navigate('main', { screen: 'Perfil' });        }, 300);
      }
    } catch (error) {
      console.log('Erro ao atualizar perfil:', error);
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>E-mail</Text>
        <TextInput
          value={newEmail}
          placeholder="example@example.com"
          style={styles.text}
          onChangeText={(e) => setNewEmail(e)}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Whatsapp</Text>
        <TextInput
        value={newWhatsapp}
          placeholder="ex.:11999999999"
          style={styles.text}
          onChangeText={(e) => setNewWhatsapp(e)}
        />
      </View>
    
      <View style={styles.buttons}>
        <Button title="Salvar" type="primary" onPress={editProfile}/>
      </View>
    </View>
  );
  }
