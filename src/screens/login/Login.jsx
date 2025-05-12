import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import icon from '../../constants/icon';
import { styles } from './login.style';
import Button from '../../components/button/Button';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Login(props) {
  const { login } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
 

  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log('Usuário logado!');
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert(
        'Erro ao fazer login',
        'Verifique seu e-mail e senha e tente novamente.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={icon.logo} style={styles.logo} />
        <Text style={{fontFamily: 'CinzelDecorative_700Bold', fontSize: 20, color: '#000'}}>
          Ti Barbearia</Text>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons style={styles.icon} name="email" size={18} />
          <TextInput
            placeholder="E-mail de acesso"
            style={styles.input}
            onChangeText={(e) => setEmail(e)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="lock" // Ícone de tesoura do MaterialCommunityIcons
            size={18}
          />
          <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
          />
        </View>
        <Button title="Acessar" onPress={handleLogin} />
      </View>
      <View style={styles.footer}>
        <Text>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('account')}>
          <Text style={styles.footerLink}>Criar conta agora!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
