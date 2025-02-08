import { Alert, Text, TextInput, View } from 'react-native';
import { styles } from './editProfile.style';
import { AuthContext } from '../../context/auth';
import { useContext, useState } from 'react';
import Button from '../../components/button/Button';
import ModalCustom from '../../components/modal/ModalCustom';
import API from '../../constants/api';

export default function ResetPassword(props) {
  const { user } = useContext(AuthContext); // 🔹 Obtém os dados do usuário

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  async function editPassword() {
    if (!newPassword || !confirmPassword) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert('Erro', 'As senhas não coincidem.');
    }

    setIsModalVisible(true); // Exibe o modal de confirmação
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = async () => {
    setIsModalVisible(false); // Oculta o modal

    try {
      const response = await API.put(`/users/${user.id_user}/senha`, {
        password: newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        props.navigation.goBack();
      } else {
        console.error('Resposta de erro:', response);
        Alert.alert(
          'Erro',
          'Não foi possível alterar a senha. Status:' + response.status,
        );
      }
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      Alert.alert('Erro', 'Não foi possível alterar a senha. ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>Nova senha</Text>
        <TextInput
          value={newPassword}
          style={styles.text}
          secureTextEntry={true} // 🔹 Oculta a senha
          onChangeText={setNewPassword}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Confirmar nova senha</Text>
        <TextInput
          value={confirmPassword}
          style={styles.text}
          secureTextEntry={true} // 🔹 Oculta a senha
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={styles.buttons}>
        <Button title="Salvar" type="primary" onPress={editPassword} />
      </View>

      <ModalCustom
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        text="Tem certeza que deseja alterar sua senha?"
        cancelButtonText="Cancelar"
        confirmButtonText="Confirmar"
      />
    </View>
  );
}
