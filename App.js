import React from 'react';
import { Text } from 'react-native';
import Dashboard from './src/components/Dashboard/Dashboard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik';

export default function App() {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return <Text> </Text>
  } else {
    return (
      <GestureHandlerRootView><Dashboard /></GestureHandlerRootView>
    );
  }
  
}
