import {
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import icon from '../../constants/icon';
import { styles } from './account.style';
import Button from '../../components/button/Button';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';

export default function Account(props) {
  const [type, setType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  const data = [
    { label: 'Cliente', value: 'Cliente' },
    { label: 'Barbeiro', value: 'Barbeiro' },
  ];

  const { signup } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleAccount() {
    if (!name || !whatsapp || !email || !password || !type) {
      Alert.alert('Atenção!', 'Preencha todos os campos!');
      return;
    }

    setIsLoading(!isLoading);
    try {
      console.log('Enviando:', { name, whatsapp, email, password, type });

      const response = await signup(name, whatsapp, email, password, type);

      if (response.data) {
        Alert.alert('Conta criada com sucesso!');
        console.log('Conta criada com sucesso:', response.data);
        props.navigation.navigate('login');
      }
    } catch (error) {
      let errorMessage = 'Erro ao realizar o cadastro. Tente novamente.';
      console.log(errorMessage, error);

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este e-mail já está em uso.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha deve ter no mínimo 6 caracteres.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido.';
      }

      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(!isLoading);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={icon.logo} style={styles.logo} />
        <Text style={{fontFamily: 'CinzelDecorative_700Bold', fontSize: 20, color: '#000'}}>
          Ti Barbearia</Text>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <AntDesign style={styles.icon} color={'blue'} name="user" size={18} />
          <TextInput
            placeholder="Nome"
            style={styles.input}
            onChangeText={(e) => setName(e)}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome
            style={styles.icon}
            color={'green'}
            name="whatsapp"
            size={18}
          />
          <TextInput
            placeholder="Whatsapp (ex.:11999999999)"
            style={styles.input}
            onChangeText={(e) => setWhatsapp(e)}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="email"
            size={18}
            color={'blue'}
          />
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
            name="lock"
            size={18}
            color={'red'}
          />
          <TextInput
            placeholder="Senha de acesso"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
          />
        </View>
        <View style={styles.inputContainer}>
          {type === 'Barbeiro' && (
            <MaterialCommunityIcons
              style={styles.icon}
              color={'blue'}
              name="content-cut" // Ícone de tesoura do MaterialCommunityIcons
              size={18}
            />
          )}
          {type === 'Cliente' && (
            <FontAwesome
              style={styles.icon}
              color={'blue'}
              name="user"
              size={18}
            />
          )}

          <Dropdown
            style={[styles.input, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Escolha seu perfil' : '...'}
            value={type}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setType(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <Button
          title="Criar conta"
          onPress={handleAccount}
          loading={isLoading}
        />
      </View>
      <View style={styles.footer}>
        <Text>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
          <Text style={styles.footerLink}>Faça seu login aqui!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
