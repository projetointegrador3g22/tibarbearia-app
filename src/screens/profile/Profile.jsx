import { Alert, Text, View } from 'react-native';
import { styles } from './profile.style';
import { AuthContext } from '../../context/auth';
import { useContext, useState } from 'react';
import Button from '../../components/button/Button';
import API from '../../constants/api';
import ModalCustom from '../../components/modal/ModalCustom';

export default function Profile(props) {
  const { user, logout } = useContext(AuthContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalAction, setModalAction] = useState(null); // Armazena a ação a ser executada

  async function handleDeleteProfile() {
    try {
      const response = await API.delete(`/users/${user.id_user}`);
      // if (response.data?.id_user) {
      //   Alert.alert('Perfil excluído com sucesso!');
      //   logout();
      // }
      if (response.status === 200) { 
        Alert.alert('Perfil excluído com sucesso!');
        logout();
      } else {
        Alert.alert('Erro ao excluir perfil. Tente novamente.');
      }
    } catch (error) {
      console.log('Erro ao excluir perfil:', error);
    }
  }

  const showModal = (action) => {
    setIsModalVisible(true);
    setModalAction(action);

    if (action === 'logout') {
      setModalText('Tem certeza que deseja sair da sua conta?');
    } else if (action === 'delete') {
      setModalText(
        `Tem certeza que deseja excluir sua conta? 
        Esta ação é irreversível.`,
      );
    }
  };

  const handleConfirm = () => {
    if (modalAction === 'logout') {
      logout();
    } else if (modalAction === 'delete') {
      handleDeleteProfile();
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
        <Button
          title="Editar Perfil"
          type="primary"
          onPress={() => {
            props.navigation.navigate('editProfile');
          }}
        />
        <Button
          title="Redefinir Senha"
          type="primary"
          onPress={() => {
            props.navigation.navigate('resetPassword');
          }}
        />
        <Button
          title="Excluir Conta"
          type="danger"
          onPress={() => showModal('delete')}
        />
        <Button
          title="Sair"
          type="danger"
          onPress={() => showModal('logout')}
        />
      </View>
      <ModalCustom
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        text={modalText} // Usa o estado modalText
        cancelButtonText="Cancelar"
        confirmButtonText="Confirmar"
      />
    </View>
  );
}
