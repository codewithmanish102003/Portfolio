import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

console.log("API_KEY:", API_KEY); // Add this line to verify the API key

if (!API_KEY) {
  throw new Error("Google Gemini API key is missing");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I couldn't process your request.";
  }
}