//Changing to Cave Screen
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function ShellScreen(){
const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>This is the Cave Screen</Text>
          <Button
          title="Enter Willow's Cave"
          onPress={() => router.push('/Screens/RoomScreen') }//.push allows user to go back(allegedly)
          />
          
          <Button
          title="Enter Bamboo's forest"
          onPress={() => router.push('/Screens/BambooScreen')}
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