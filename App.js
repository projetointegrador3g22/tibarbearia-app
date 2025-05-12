import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';
import { AuthProvider } from './src/context/auth';
import { CinzelDecorative_700Bold, useFonts } from '@expo-google-fonts/cinzel-decorative';

export default function App() {

    const [fontsLoaded] = useFonts({
      CinzelDecorative_700Bold,
    })
  
    if (!fontsLoaded) {
      return null;
    }


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
