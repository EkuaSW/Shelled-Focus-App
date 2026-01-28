
//THIS IS THE PROFILE SCREEN 

// app/welcome.tsx
import React from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Turning into Profile</Text>
      <Button
        title="Back Home"
        onPress={() => router.replace('/')}  // specify route 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'linen',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'saddlebrown',
  },
});