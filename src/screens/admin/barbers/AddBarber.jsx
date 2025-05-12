import { Alert, Text, View, TextInput } from 'react-native';
import { styles } from './profile.style';
import { AuthContext } from '../../../context/auth';
import { useContext, useState } from 'react';
import Button from '../../../components/button/Button';
import ModalCustom from '../../../components/modal/ModalCustom';

export default function AddBarber(props) {
  const { user, deleteAccount, logout } = useContext(AuthContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalAction, setModalAction] = useState(null); // Armazena a ação a ser executada
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState(''); // Armazena a senha para exclusão da conta
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  async function handleDeleteProfile() {
    if (!password) {
      Alert.alert(
        'Atenção',
        'Por favor, digite sua senha para confirmar a exclusão',
      );
      return;
    }
    setIsDeleting(true);
    try {
      await deleteAccount(password);
      await logout();
      Alert.alert('Sucesso', 'Sua conta foi excluída permanentemente');
    } catch (error) {
      console.error('Erro detalhado:', error);
      let errorMessage = 'Erro ao excluir conta. Tente novamente mais tarde.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta. Tente novamente.';
      }
      if (
        error.code === 'FirebaseError: Missing or insufficient permissions.'
      ) {
        errorMessage =
          'Permissões de exclusão insuficientes no vanco de dados.';
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsDeleting(false);
      setIsModalVisible(false);
      setPassword(''); // Limpa o campo de senha após a exclusão
    }
  }

  const showModal = (action) => {
    setModalAction(action);
    setPassword(''); // Resetar senha ao abrir o modal

    if (action === 'logout') {
      setModalText('Tem certeza que deseja sair da sua conta?');
      setShowPasswordInput(false);
    } else if (action === 'delete') {
      setModalText(
        `Para excluir sua conta permanentemente,\ndigite sua senha abaixo:`,
      );
      setShowPasswordInput(true); // Mostra o campo de senha para confirmação
    }
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    if (modalAction === 'logout') {
      logout();
    } else if (modalAction === 'delete') {
      handleDeleteProfile();
      return; // Não fechar o modal ainda (vai fechar no finally do handleDeleteProfile)
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPassword('');
    setShowPasswordInput(false);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.buttons}>
        <Button
          title="Barbeiros"
          type="primary"
          onPress={() => {
            props.navigation.navigate('editProfile');
          }}
        />
        <Button
          title="Clientes"
          type="primary"
          onPress={() => {
            props.navigation.navigate('resetPassword');
          }}
        />
        <Button
          title="Serviços e Valores"
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
        // confirmButtonText="Confirmar"
        confirmButtonText={modalAction === 'delete' ? 'Excluir' : 'Sair'}
        confirmButtonDisabled={modalAction === 'delete' && !password}
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
