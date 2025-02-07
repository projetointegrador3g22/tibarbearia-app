import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login/Login';
import Account from '../screens/account/Account';

const Stack = createNativeStackNavigator();

export default function RoutesOpen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
