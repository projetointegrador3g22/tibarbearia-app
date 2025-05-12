// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCCK4aaWlm_DuzhUw9WL6lX1rvl5gNJHdM',
  authDomain: 'tibarbearia.firebaseapp.com',
  projectId: 'tibarbearia',
  storageBucket: 'tibarbearia.firebasestorage.app',
  messagingSenderId: '528116037691',
  appId: '1:528116037691:web:4bba08c5ecb37d0d14c41e',
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
