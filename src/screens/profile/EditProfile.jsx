import { Alert, Text, TextInput, View } from 'react-native';
import { styles } from './editProfile.style';
import { AuthContext } from '../../context/auth';
import { useContext, useState } from 'react';
import Button from '../../components/button/Button';
import ModalCustom from '../../components/modal/ModalCustom';
import API from '../../constants/api';

export default function EditProfile(props) {
  const { user, setUser } = useContext(AuthContext);

  const [newEmail, setNewEmail] = useState(user.email);
  const [newWhatsapp, setNewWhatsapp] = useState(user.whatsapp);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [modalText, setModalText] = useState('');

  const showModal = () => {
    setModalText('Deseja salvar as alterações?');
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    try {
      if (newEmail !== user.email && newEmail !== null) user.email = newEmail;
      if (newWhatsapp !== user.whatsapp && newWhatsapp !== null)
        user.whatsapp = newWhatsapp;
      const response = await API.put(`/users/${user.id_user}`, {
        email: user.email,
        whatsapp: user.whatsapp,
      });

      if (response.data?.id_user) {
        Alert.alert('Perfil atualizado com sucesso!');
        setUser(response.data);

        const updatedUser = await API.get(`/users/profile`);

        if (updatedUser.data) {
          setUser(updatedUser.data);
        }

        setTimeout(() => {
          props.navigation.navigate('main', { screen: 'Perfil' });
        }, 300);
      }
    } catch (error) {
      console.log('Erro ao atualizar perfil:', error);
    } finally {
      setIsModalVisible(false); // Feche o modal independentemente do resultado da requisição
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
        <Button title="Salvar" type="primary" onPress={showModal} />
      </View>

      <ModalCustom
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        text={modalText}
        cancelButtonText="Cancelar"
        confirmButtonText="Confirmar"
      />
    </View>
  );
}
