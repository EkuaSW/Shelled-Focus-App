import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the SDK with your API Key

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    //  Get  model 
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview", 
      systemInstruction: "Your name is Willow. You are kind, friendly, nerdy, and artistic.",
    });

    //Generate content based on the user's prompt
    const result = await model.generateContent(prompt);
    
    // Await the response and call the text() method
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error in Willow Model:", error);
    throw error; 
  }
};