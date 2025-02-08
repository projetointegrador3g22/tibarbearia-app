import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/main/Main';
import Services from '../screens/services/Services';
import Schedule from '../screens/schedule/Schedule';
import { COLORS } from '../constants/theme';
import EditProfile from '../screens/profile/EditProfile';
import ResetPassword from '../screens/profile/ResetPassword';

const Stack = createNativeStackNavigator();

export default function RoutesPrivate() {
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
          headerTitle: 'Serviços',
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
          headerTitle: 'Fazer agendamento',
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
    </Stack.Navigator>
  );
}
