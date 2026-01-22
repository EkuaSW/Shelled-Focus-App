// app/index.tsx
import React from 'react';

import { View, Text, StyleSheet, Button} from 'react-native';
import{SafeAreaView} from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';



export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitles}>Welcome to the main app, Dorcas</Text>
      <Button title="Welcome Page "
      onPress={() => router.replace('./Screens/WelcomeScreen')}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linen',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'saddlebrown'
  },

  subtitles:{
    fontSize: 20,
    color: 'saddlebrown'
  }
});