import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../profile/Profile';
import Calendar from '../calendar/Calendar';
import Home from '../home/Home';
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Agende seu horário"
        component={Home}
        options={{
          headerTitleAlign: 'center',
          // headerTitle: () => {
          //   return (
          //     <Image source={icon.logo} style={{ width: 45, height: 55 }} />
          //   );
          // },
          tabBarIcon: ({ focused }) => {
            return (
              <Entypo
                name="home"
                size={25}
                color="black"
                style={{ opacity: focused ? 1 : 0.3 }}
              />
            );
            // icon.homeIcon;
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Agendamentos"
        component={Calendar}
        options={{
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
        name="Perfil"
        component={Profile}
        options={{
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
    </Tab.Navigator>
  );
}
