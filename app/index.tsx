// app/index.tsx

//THIS IS THE HOME SCREEN 
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text, StyleSheet, Button, Alert, TouchableOpacity} from 'react-native';
import{SafeAreaView} from 'react-native-safe-area-context';


import { useRouter } from 'expo-router';


//------------------------------------MOOD LOG INFORMATION---------------------------------------

type Mood = 'angry'| 'happy' |'just ok'| 'sad'|'tired';

interface LogMood{ //picking the mood 
  date: string ;
  mood: Mood;
  //note: string; //for journal entry 
}


//----------------------------------SNAIL INFORMATION--------------------------------------

interface Snail { //for snail selection 
  id: string;
  name : string;
  personality: string;
  color: string;
  quote: string;
}





export default function HomeScreen() {
  const router = useRouter();


  const[currentMood, setCurrentMood] = useState<Mood | null>(null);
  const moods: Mood[] = ['angry', 'happy', 'just ok', 'sad', 'tired'];

  const savedMood = async (selectedMood: Mood) => {
    try{
      const newEntry: LogMood = {
        date: new Date().toISOString().split('T')[0],// truncated to the date only
        mood: selectedMood,
        
      };

      await AsyncStorage.setItem('@last_mood', JSON.stringify(newEntry));
      setCurrentMood(selectedMood);
      //Alert.alert("Mood Logged", `The snails are glad you shared that you're feeling ${selectedMood}.`);
    } catch (e){
      console.error("Failed to save mood", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>How're we doing today?</Text>
      <View style={styles.moodRow}>
        {moods.map((m) => (
          <TouchableOpacity
          key={m}
          style={[styles.moodButton, currentMood === m && styles.selectedButton]}
          onPress={() => savedMood(m)}
          >
            <Text style={[
              styles.moodLabel, 
              currentMood === m ? styles.labelSelected : styles.labelUnselected
            ]}>
              
            </Text>
            <Text style={styles.moodLabel}>{m}</Text>
          </TouchableOpacity>
        )
      )}
      </View>
      {currentMood && (
        <Text style={styles.status}>Today you feel: {currentMood}</Text>
      )}
         
    </SafeAreaView>
  );
}














//-------------------------------------PAGE DECORATIONS---------------------------------------
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
  },

  moodRow:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },

  moodButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    width: 65
  },
  selectedButton: {
    borderColor: 'saddlebrown',
    borderWidth: 2,
    backgroundColor: 'peachpuff'
  },

  moodText: {
    fontSize: 30,
  },
  moodLabel: {
    fontSize: 13,
    color: 'saddlebrown',
    marginTop: -5,
    marginBottom:0.5,
    justifyContent: 'center'
  },

  status:{
    marginTop: 20,
    fontStyle: 'italic',
    color: 'saddlebrown'
  },

  labelSelected:{
    color: 'linen'
  },

  labelUnselected: {
    color: 'saddlebrown'
  }, 

  chipSelected: {
    backgroundColor: 'saddlebrown',
  },

  chipUnselected:{
    backgroundColor: 'transparent '
  },

  moodChip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },

  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  }


});