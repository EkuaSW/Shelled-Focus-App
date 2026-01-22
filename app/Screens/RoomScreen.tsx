import React from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';



export default function RoomScreen(){
const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>This is the Room Screen </Text>
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