

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Stack, Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'saddlebrown' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color,size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size}></MaterialCommunityIcons>
          ),
        }}
      />

         <Tabs.Screen 
      name="Screens/ShellScreen"
      options={{
        title: 'Shells',
        tabBarIcon: ({color,size}) => (
        <MaterialCommunityIcons name= "door-open" color={color} size={size}/>
        ),
      }}
      />

      <Tabs.Screen
      name="Screens/WelcomeScreen"
      options={{
        title: 'Profile',
        tabBarIcon: ({color,size}) => (
        <MaterialCommunityIcons name="account" color={color} size={size}/>
        ),
      }}
      />

      <Tabs.Screen
      name="Screens/RoomScreen"
      options={{
        title: 'Chat with Willow',
        href: null, //so that the screen screen doesnt show 
      }}
      />

    </Tabs>
  );
}
