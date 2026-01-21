// app/_layout.tsx

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Tabs} from 'expo-router';


export  function RootLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'darksalmon',
          },
          headerTitleAlign: 'center',
        }}
      >
        {/* Home screen (your "index" screen) */} 
        <Stack.Screen
          name="index" //this screen is whats showing first 
          options={{
            title: 'Home',
          }}
        />

        {/* Welcome screen - shown first */}
        <Stack.Screen
          name="Screens/WelcomeScreen" //was originally welcome
          options={{
            title: 'Welcome',
            headerShown: false,     // optional: cleaner look for welcome
          }}
        />

      </Stack>
    </SafeAreaProvider>
  );
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'darksalmon' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color,size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size}></MaterialCommunityIcons>
          ),
        }}
      />
      <Tabs.Screen/>
    </Tabs>
  );
}
