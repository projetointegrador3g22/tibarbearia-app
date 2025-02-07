import { Alert, Text, TextInput, View } from 'react-native';
import { styles } from './editProfile.style';
import { AuthContext } from '../../context/auth';
import { useContext, useState } from 'react';
import Button from '../../components/button/Button';
import API from '../../constants/api';

export default function ResetPassword(props) {
  const { user, setUser } = useContext(AuthContext);

  const [newPassword, setNewPassword] = useState(null);

  async function editPassword() {
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
        <Text style={styles.title}>Nova senha</Text>
        <TextInput
          value={newEmail}
          style={styles.text}
          onChangeText={(e) => setNewEmail(e)}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Confirmar nova senha</Text>
        <TextInput
        value={newWhatsapp}
          style={styles.text}
          onChangeText={(e) => setNewPassword(e)}
        />
      </View>
    
      <View style={styles.buttons}>
        <Button title="Salvar" type="primary" onPress={editPassword}/>
      </View>
    </View>
  );
  }
