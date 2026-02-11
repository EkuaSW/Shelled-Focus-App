import {GoogleGenerativeAI} from "@google/generative-ai";

//initialzing SDK

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiResponse = async (prompt:string): Promise<string> => {
    try{
        //grab the model 
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
            systemInstruction: "Your name is Bamboo. You're a super sweet and adorable panda bear, but a bit lazy. You like to relax and help others relax. Respond in 2 short sentences or less.",
        });

        //generate content based on the user 
        const result = await model.generateContent(prompt);

        //wait for response and call text()
        const response = await result.response;
        const text = response.text();


        return text;
    } catch(error){
        console.error("Error in Willow Model:", error);
        throw error;
    }
}