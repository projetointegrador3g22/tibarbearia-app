import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import icon from '../../constants/icon';
import { styles } from './account.style';
import Button from '../../components/button/Button';
import { useState } from 'react';
import API from '../../constants/api';
export default function Account(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');

  async function handleAccount(){
    try {
      console.log('Enviando:', { name, whatsapp, email, password }); // Verifica se os valores estão corretos
  
      const response = await API.post('/users/register', { name, whatsapp, email, password });
  
      if (response.data) {
        Alert.alert('Conta criada com sucesso!');
        console.log('Conta criada com sucesso:', response.data);
        setName('');
        setEmail('');
        setWhatsapp('');
        setPassword('');
        props.navigation.navigate('login');
      }
    } catch (error) {
      console.log('Erro no cadastro:', error);
  
      if (error.response?.data?.error) {
        Alert.alert(error.response.data.error);
      } else {
        Alert.alert('Erro desconhecido');
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={icon.logo} style={styles.logo} />
      </View>
      <View>
        <TextInput placeholder="Nome" style={styles.input} onChangeText={(e) => setName(e)}/>
        <TextInput placeholder="E-mail" style={styles.input} onChangeText={(e) => setEmail(e)}/>
        <TextInput placeholder="Whatsapp (ex.:11999999999)" style={styles.input} onChangeText={(e) => setWhatsapp(e)}/>
        <TextInput placeholder="Senha" style={styles.input} secureTextEntry={true} onChangeText={(e) => setPassword(e)}/>
        <Button title="Criar conta" onPress={handleAccount} />
      </View>
      <View style={styles.footer}>
        <Text>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('login')}><Text style={styles.footerLink}>Faça seu login aqui!</Text></TouchableOpacity>
      </View>
    </View>
  );
}
