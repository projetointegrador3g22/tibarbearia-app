import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/main/Main';
import Services from '../screens/services/Services';
import Schedule from '../screens/schedule/Schedule';
import { COLORS } from '../constants/theme';
import EditProfile from '../screens/profile/EditProfile';
import ResetPassword from '../screens/profile/ResetPassword';
import Clients from '../screens/admin/clients/Clients';
import AddClient from '../screens/admin/clients/AddClient';
import Barbers from '../screens/admin/barbers/Barbers';
import AddBarber from '../screens/admin/barbers/AddBarber';
import ServicesAndValues from '../screens/admin/servicesAndValues/ServicesAndValues';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();

export default function RoutesPrivate() {
  const { user } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="services"
        component={Services}
        options={{
          headerTitle: user.perfil === 'Cliente' ? 'Serviços' : 'Novo agendamento',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.black,
          headerStyle: {
            backgroundColor: COLORS.gray5,
          },
        }}
      />
      <Stack.Screen
        name="schedule"
        component={Schedule}
        options={{
          headerTitle: 'Data e Horário',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
        }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          headerTitle: 'Editar Perfil',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
        }}
      />
      <Stack.Screen
        name="resetPassword"
        component={ResetPassword}
        options={{
          headerTitle: 'Redefinir Senha',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
        }}
      />
      <Stack.Screen
        name="clients"
        component={Clients}
        options={{
          headerTitle: 'Clientes',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
        }}
      />
      <Stack.Screen
        name="addClient"
        component={AddClient}
        options={{
          headerTitle: 'Adicionar Cliente',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
        }}
      />
      <Stack.Screen
        name="editClient"
        component={AddClient}
        options={{
          headerTitle: 'Editar Cliente',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
        }}
      />
      <Stack.Screen
        name="barbers"
        component={Barbers}
        options={{
          headerTitle: 'Barbeiros',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
        }}
      />
      <Stack.Screen
        name="addBarber"
        component={AddBarber}
        options={{
          headerTitle: 'Adicionar Barbeiro',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
        }}
      />
      <Stack.Screen
        name="editBarber"
        component={AddBarber}
        options={{
          headerTitle: 'Editar Barbeiro',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
        }}
      />
      <Stack.Screen
        name="servicesAndValues"
        component={ServicesAndValues}
        options={{
          headerTitle: 'Serviços e Valores',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
        }}
      />
    </Stack.Navigator>
  );
}
