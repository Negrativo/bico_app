import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Stack from './stack/navigation';
import { UserProvider } from '../context/AuthContext';

export default function () {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack />
          <Toast />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}
