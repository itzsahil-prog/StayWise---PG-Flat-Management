
import { GoogleGenAI, Type } from "@google/genai";
import { Property } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartRecommendations(query: string, properties: Property[]): Promise<string> {
  const propertiesContext = properties.map(p => ({
    id: p.id,
    title: p.title,
    location: p.location,
    rent: p.rent,
    type: p.type,
    gender: p.gender,
    amenities: p.amenities
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are StayWise AI, a helpful real estate assistant.
        The user is asking: "${query}"
        Here are the available properties: ${JSON.stringify(propertiesContext)}
        
        Analyze the request and recommend the top 2 matches if any. Explain why they fit.
        Keep it concise, friendly, and professional. 
        If no matches, suggest what they might like instead from the list.
      `,
    });
    return response.text || "I'm sorry, I couldn't process your request right now.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Our AI assistant is currently taking a break. Please use the manual filters!";
  }
}
