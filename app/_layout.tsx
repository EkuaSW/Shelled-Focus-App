

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Stack, Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';


// export  function RootLayout() {
//   return (
//     <SafeAreaProvider style={{ flex: 1 }}>
//       <Stack
//         screenOptions={{
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: 'linen',
//           },
//           headerTitleAlign: 'center',
//         }}
//       >
//         {/* Home screen (your "index" screen) */} 
//         <Stack.Screen
//           name="index" //this screen is whats showing first 
//           options={{
//             title: 'Home',
//           }}
//         />

//         {/* Welcome screen - shown first */}
//         <Stack.Screen
//           name="Screens/WelcomeScreen" //was originally welcome
//           options={{
//             title: 'Profile',
//             headerShown: false,     // optional: cleaner look for welcome
//           }}
//         />
//         {/*Adding the shell screen */}
//         <Stack.Screen
//         name="Screens/ShellScreen"
//         options={{
//           title: 'Shells',
//           headerShown: false,
//         }}
//         />

//         {/* Adding the Room Screen */}
//         <Stack.Screen
//         name="Screens/RoomScreen"
//         options={{
//           title: 'Rooms',
//           headerShown: false,
//         }}
//         />

//       </Stack>
//     </SafeAreaProvider>
//   )
// }

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
