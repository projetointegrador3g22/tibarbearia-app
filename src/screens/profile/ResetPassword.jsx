import { Alert, Text, View, TextInput } from 'react-native';
import { styles } from './profile.style';
import { AuthContext } from '../../context/auth';
import { useContext, useState } from 'react';
import Button from '../../components/button/Button';
import ModalCustom from '../../components/modal/ModalCustom';

export default function Profile(props) {
  const { user, updateUserPassword } = useContext(AuthContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalAction, setModalAction] = useState(null); // Armazena a ação a ser executada
  const [password, setPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  async function handleChangePassword() {
      if (!password) {
      Alert.alert('Atenção', 'Por favor, digite sua senha atual para confirmar a alteração');
      return;
    }

    try {
      await updateUserPassword(newPassword, password);
      Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
      props.navigation.navigate('main', { screen: 'Perfil' }); // Navega para a tela de perfil após a atualização
    } catch (error) {
      console.error('Erro detalhado:', error);
      let errorMessage = 'Erro ao alterar senha. Tente novamente mais tarde.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta. Tente novamente.';
      }
      if (error.code === 'FirebaseError: Missing or insufficient permissions.') {
        errorMessage = 'Permissões de alteração insuficientes no banco de dados.';
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsModalVisible(false);
      setPassword(''); // Limpa o campo de senha após a exclusão
    }
  }

  const showModal = (action) => {
    setModalAction(action);
    setPassword(''); // Resetar senha ao abrir o modal
    
   if (action === 'changePassword') {
      setModalText(
        `Para confirmar sua nova senha ,\ndigite sua senha atual abaixo:`
      );
      setShowPasswordInput(true); // Mostra o campo de senha para confirmação
    }
    setIsModalVisible(true);

  };

  const handleConfirm = () => {
    // if (modalAction === 'changePassword') {
      if (!newPassword || !confirmPassword) {
        Alert.alert('Erro', 'Preencha todos os campos.');
        return;
      }
  
      if (newPassword !== confirmPassword) {
        Alert.alert('Erro', 'As senhas não coincidem.');
        return;
      }
  
      if (newPassword.length < 6 || confirmPassword.length < 6) {
        Alert.alert(
          'Erro',
          'A nova senha deve ter pelo menos 6 caracteres.'
        );
        return;
      }
      showModal('changePassword');
      return; // Não fechar o modal ainda (vai fechar no finally do handleDeleteProfile)
    // }
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPassword('');
    setShowPasswordInput(false);
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
        <Button title="Salvar" type="primary" onPress={() => handleConfirm()} />
      </View>

      <ModalCustom
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={() => handleChangePassword()}
        text={modalText} // Usa o estado modalText
        cancelButtonText="Cancelar"
        confirmButtonText={modalAction === 'changePassword' && 'Alterar senha'}
        confirmButtonDisabled={modalAction === 'changePassword' && !password}
      >
         {showPasswordInput && (
          <TextInput
            style={styles.passwordInput}
            secureTextEntry
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        )}
      </ModalCustom>
    </View>
  );
}
