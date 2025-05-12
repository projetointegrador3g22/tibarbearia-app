import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../profile/Profile';
import Calendar from '../calendar/Calendar';
import Home from '../home/Home';
import Admin from '../admin/Admin';
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import { AuthContext } from '../../context/auth';
import { useContext } from 'react';

const Tab = createBottomTabNavigator();

export default function Main() {
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Agendamentos"
        component={Calendar}
        options={{
          headerTitleStyle: { fontSize: 20 },
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="calendar-number"
                size={25}
                color="black"
                style={{ opacity: focused ? 1 : 0.3 }}
              />
            );
          },
          tabBarShowLabel: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={user.perfil === 'Cliente' ? 'Barbeiros' : 'Serviços Prestados'}
        component={Home}
        options={{
          headerTitleStyle: { fontSize: 20 },
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="cut"
                size={25}
                color="black"
                style={{ opacity: focused ? 1 : 0.3 }}
              />
            );
          },
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerTitleStyle: { fontSize: 20 },
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                name="user-alt"
                size={25}
                color="black"
                style={{ opacity: focused ? 1 : 0.3 }}
              />
            );
          },
          tabBarShowLabel: false,
        }}
      />
      {user.perfil === 'Barbeiro' && (
        <Tab.Screen
          name="Gerenciamento"
          component={Admin}
          options={{
            headerTitleStyle: { fontSize: 20 },
            headerTitleAlign: 'center',
            tabBarIcon: ({ focused }) => {
              return (
                <FontAwesome5
                  name="tools"
                  size={25}
                  color="black"
                  style={{ opacity: focused ? 1 : 0.3 }}
                />
              );
            },
            tabBarShowLabel: false,
          }}
        />
      )}
    </Tab.Navigator>
  );
}
