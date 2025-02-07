import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';
import { AuthProvider } from './src/context/auth';

export default function App() {
  const name = 'Gustavo';
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}
