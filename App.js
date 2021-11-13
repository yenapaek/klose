import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './src/components/Dashboard/Dashboard';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>change</Text>
    //   <StatusBar style="auto" />
    // </View>
    <Dashboard />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
