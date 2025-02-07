import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import icon from '../../constants/icon';
import { styles } from './login.style';
import Button from '../../components/button/Button';
import { useContext, useState } from 'react';
import API from '../../constants/api';
import { AuthContext } from '../../context/auth';


export default function Login(props) {
  const {setUser} = useContext(AuthContext);
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(){
    try {
      console.log('Enviando:', { whatsapp, password }); // Verifica se os valores estão corretos
  
      const response = await API.post('/users/login', { whatsapp, password });
  
      if (response.data) {
        API.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setUser(response.data);
      }
    } catch (error) {
      console.log('Erro no login:', error);
  
      if (error.response?.data?.error) {
        Alert.alert(error.response.data.error);
      } else {
        Alert.alert('Erro desconhecido', error);
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={icon.logo} style={styles.logo} />
      </View>
      <View>
        <TextInput placeholder="Whatsapp (ex.:11999999999)" style={styles.input} onChangeText={(e) => setWhatsapp(e)}/>
        <TextInput placeholder="Senha" style={styles.input} secureTextEntry={true} onChangeText={(e) => setPassword(e)}/>
        <Button title="Acessar" onPress={handleLogin} />
      </View>
      <View style={styles.footer}>
        <Text>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => props.navigation.goBack()}><Text style={styles.footerLink}>Criar conta agora!</Text></TouchableOpacity>
      </View>
    </View>
  );
}
