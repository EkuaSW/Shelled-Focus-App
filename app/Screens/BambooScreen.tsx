//THIS SCREEN BELONGS TO BAMBOO 

//AI integrations 
import {GoogleGenAI} from "@google/genai";
import { GoogleGenerativeAI} from "@google/generative-ai";

//importing bamboo 
import {getGeminiResponse} from '../../AiModels/bamboo';

import React, {useState} from 'react';
import { Text, Button, StyleSheet, View, TextInput, 
        ScrollView, TouchableOpacity,ActivityIndicator, 
        KeyboardAvoidingView, Platform} from 'react-native';
        
import { useRouter } from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';

//Constant ai Variable and Key
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
//-----------------------------------IMPORTS---------------------------------------



//Defining the messages structure 

interface Message {
    role: 'user' | 'bamboo';
    text: string;

}


export default function BambooScreen(){
const router = useRouter();

const [input,setInput] = useState<string>('');
//holding an array of messages 
const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(false);


const sendMessage = async () => {
    if (!input.trim()) return; 

    //user messages objects 
    const userMessage: Message = {role: 'user', text: input};
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
        const response = await getGeminiResponse(input);

        const bambooMessage: Message = {role: 'bamboo', text: response};
        setMessages([...newMessages, bambooMessage]);
    }
    catch (error){
        console.error("bamboo Error", error);

        const errorMessage: Message = {
            role: 'bamboo',
            text: "Sorry eating bamboo"
        };

        setMessages([...newMessages, errorMessage]);
    }finally{
        setIsLoading(false);
    }
};
    
return (
        <SafeAreaView style={styles.container}>
          {/* Adding keyboard avoiding view  */}
          <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex:1, width: '100%'}}
          ></KeyboardAvoidingView>
      <Text style={styles.headerTitle}>Study Room with Bamboo</Text>
      
      <ScrollView 
        style={styles.chatArea} 
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((msg, index) => (
          <View 
            key={index} 
            style={[
              styles.bubble, 
              msg.role === 'user' ? styles.userBubble : styles.bambooBubble
            ]}
          >
            <Text style={styles.bubbleText}>{msg.text}</Text>
          </View>
        ))}
        {isLoading && (
          <ActivityIndicator color="saddlebrown" style={{ marginTop: 10 }} />
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Talk to Bamboo..."
          value={input}
          onChangeText={(text: string) => setInput(text)}
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={sendMessage}
          disabled={isLoading} // Disable button while bamboo is thinking
        >
          <Text style={styles.sendButtonText}>
            {isLoading ? "..." : "Send"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
      );
}

//---------------------------------------SCREEN STYLE------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'palegoldenrod',
  },

    headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'saddlebrown', 
    marginVertical: 10 
  },

  chatArea: { 
    flex: 1, 
    paddingHorizontal: 15 
  },

  bubble: { 
    padding: 12, 
    borderRadius: 15, 
    marginVertical: 5, 
    maxWidth: '80%' 
  },

  userBubble: { 
    alignSelf: 'flex-end', 
    backgroundColor: '#7e974d85' 
  },

  bambooBubble: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#e0e0e0' 
  },

  bubbleText: { 
    color: '#202a0b', 
    fontSize: 16 
  },

  inputContainer: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#fff', 
    alignItems: 'center' 
  },

  input: { 
    flex: 1, 
    height: 45, 
    borderRadius: 20, 
    paddingHorizontal: 15, 
    backgroundColor: '#f5f5f5', 
    marginRight: 10 
  },

  sendButton: { 
    backgroundColor: 'olivedrab', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 20 
  },

  sendButtonText: { 
    color: 'white', 
    fontWeight: 'bold' 
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#25300f',
  },
});