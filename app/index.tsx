// app/index.tsx

//THIS IS THE HOME SCREEN 
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import{SafeAreaView} from 'react-native-safe-area-context';


import { useRouter } from 'expo-router';


//------------------------------------MOOD LOG INFORMATION---------------------------------------

type Mood = 'angry'| 'happy' |'just ok'| 'sad'|'tired';

interface LogMood{ //picking the mood 
  date: string ;
  mood: Mood;
  note: string; //for journal entry 
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
  const[note, setNote] = useState<string>(''); // state for the journal text
  const moods: Mood[] = ['angry', 'happy', 'just ok', 'sad', 'tired'];

  // Logic to handle the final submission
  const handleFinalSubmit = async () => {
    if (!currentMood) {
      Alert.alert("Willow asks...", "Could you pick a mood before we save this?");//not really necessary since buton doesnt show
      return;
    }

    try {
      const newEntry: LogMood = {
        date: new Date().toISOString().split('T')[0],
        mood: currentMood,
        note: note,
      };

      await AsyncStorage.setItem('@last_mood', JSON.stringify(newEntry)); //date. mood, and current text in box saved here  
       
      Alert.alert("Entry Saved", "Willow has tucked your thoughts away in the garden.");
      
      // Clearing the note after saving
      setNote('');
    } catch (e) {
      console.error("Failed to save entry", e);
    }
  };

  const savedMood = async (selectedMood: Mood) => { //currently only saves one mood and entry keeps overwriting each new entry
    try{
      const newEntry: LogMood = {
        date: new Date().toISOString().split('T')[0],// truncated to the date only
        mood: selectedMood,
        note: note, // saving the note along with the mood
      };

      await AsyncStorage.setItem('@last_mood', JSON.stringify(newEntry));//saving the submitted entry locally; docs or library
      setCurrentMood(selectedMood);
    } catch (e){
      console.error("Failed to save mood", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Added KeyboardAvoidingView so the keyboard doesn't hide the journal input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1, width: '100%' }}
      >
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
          <Text style={styles.title}>How're we doing today?</Text>
          
          <View style={styles.moodRow}>
            {moods.map((m) => (
              <TouchableOpacity
                key={m}
                style={[styles.moodButton, currentMood === m && styles.selectedButton]}
                onPress={() => savedMood(m)}
              >
                <Text style={styles.moodLabel}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {currentMood && (
            <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
              <Text style={styles.status}>Today you feel: {currentMood}</Text>
              
              {/* New Journal Entry Section */}
              <View style={styles.journalSection}>
                <Text style={styles.subtitles}>What's the story behind the mood?</Text>
                <TextInput
                  style={styles.journalInput}
                  placeholder="Share your thoughts..."
                  placeholderTextColor="sienna"
                  multiline
                  value={note}
                  onChangeText={(text) => setNote(text)}
                />

                {/* THE SUBMIT BUTTON */}
                <TouchableOpacity 
                  style={styles.submitButton} 
                  onPress={handleFinalSubmit}
                >
                  <Text style={styles.submitButtonText}>Log</Text>
                </TouchableOpacity>

              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
    color: 'saddlebrown',
    marginTop: 20
  },

  subtitles:{
    fontSize: 18,
    color: 'saddlebrown',
    marginBottom: 10,
    fontStyle: 'italic'
  },

  moodRow:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10
  },

  moodButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    width: 65,
    height: 50
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
    textAlign: 'center'
  },

  status:{
    marginTop: 10,
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
  },

  // New styles for the Journal Section
  journalSection: {
    width: '85%',
    marginTop: 20,
  },
  journalInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    height: 120,
    textAlignVertical: 'top', 
    color: 'saddlebrown',
    borderWidth: 1,
    borderColor: 'peachpuff'
  },
  submitButton: {
    backgroundColor: 'saddlebrown',
    padding: 15,
    borderRadius: 25,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3
  },
  submitButtonText: {
    color: 'linen',
    fontWeight: 'bold',
    fontSize: 16
  }
});