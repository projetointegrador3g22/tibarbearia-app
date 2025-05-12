import { Alert, Text, TextInput, View } from 'react-native';
import { styles } from './editProfile.style';
import { AuthContext } from '../../context/auth';
import { useContext, useState } from 'react';
import Button from '../../components/button/Button';
import ModalCustom from '../../components/modal/ModalCustom';

export default function EditProfile(props) {
  const { user, updateUserData } = useContext(AuthContext);

  const [type, setType] = useState(user.perfil); // Tipo de usuário (cliente ou barbeiro)
  const [newName, setNewName] = useState(user.nome);
  const [newEmail, setNewEmail] = useState(user.emailContato);
  const [newWhatsapp, setNewWhatsapp] = useState(user.whatsapp);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [modalText, setModalText] = useState(''); // Estado para armazenar o texto do modal
  const [isEditing, setIsEditing] = useState(false);

  async function handleEditProfile() {
    setIsEditing(true);
    try {
      // Atualiza nome/whatsapp/e-mail se necessário
      if (
        newName !== user.nome ||
        newWhatsapp !== user.whatsapp ||
        newEmail !== user.emailContato
      ) {
        await updateUserData({
          nome: newName,
          whatsapp: newWhatsapp,
          emailContato: newEmail,
        }, type); // Passa o tipo de usuário para a função de atualização
      }

      Alert.alert('Sucesso', 'Dados atualizados!');
      props.navigation.navigate('main', { screen: 'Perfil' }); // Navega para a tela de perfil após a atualização
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar. Tente novamente.');
    } finally {
      setIsEditing(false);
      setIsModalVisible(false);
    }
  }

  const showModal = () => {
    setModalText('Confirma a alteração dos dados?');
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    handleEditProfile();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          value={newName}
          style={styles.text}
          onChangeText={(e) => setNewName(e)}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>E-mail de contato</Text>
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
        <Button title="Salvar" type="primary" onPress={() => showModal()} />
      </View>

      <ModalCustom
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        text={modalText} // Usa o estado modalText
        cancelButtonText="Cancelar"
        confirmButtonText={'Confirmar'}
      />
    </View>
  );
}
