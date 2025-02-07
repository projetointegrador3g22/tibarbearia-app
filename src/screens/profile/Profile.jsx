import { Text, View } from 'react-native';
import { styles } from './profile.style';
import { AuthContext } from '../../context/auth';
import { useContext, useEffect } from 'react';
import Button from '../../components/button/Button';
import API from '../../constants/api';

export default function Profile(props) {
  const { user, logout } = useContext(AuthContext);
  

  async function deleteProfile() {
    try {
      const response = await API.delete(`/users/${user.id_user}`);
      if (response.data?.id_user) {
        logout();
      }
    } catch (error) {
      console.log('Erro ao excluir perfil:', error);
    }
  }


  

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>Nome</Text>
        <Text style={styles.text}>{user.name}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>E-mail</Text>
        <Text style={styles.text}>{user.email}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Whatsapp</Text>
        <Text style={styles.text}>{user.whatsapp}</Text>
      </View>
      
      <View style={styles.buttons}>
        
          {/* <View style={styles.containerButton}> */}
            <Button title="Editar Perfil" type="primary" onPress={() => {
              props.navigation.navigate('editProfile');
            }} />
            <Button title="Redefinir Senha" type="primary" onPress={() => {
              props.navigation.navigate('resetPassword');
            }} />
          <Button title="Excluir Conta" type="danger" onPress={deleteProfile} />
            <Button title="Sair" type="danger" onPress={logout} />
          {/* </View> */}
        
      </View>
    </View>
  );
}
