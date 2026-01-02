
import { GoogleGenAI } from "@google/genai";
import { MarketInsight, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMarketInsight = async (marketQuestion: string, currentProbability: number): Promise<MarketInsight> => {
  try {
    const prompt = `Analyze the current prediction market for: "${marketQuestion}". 
    The current market probability is ${currentProbability}%. 
    
    TASK:
    1. Use Google Search to find the absolute latest news, sentiment, and data from the last 24 hours related to this topic.
    2. Explain the specific real-world drivers causing the odds to be at ${currentProbability}%.
    3. Look for breaking news or recent spikes in interest that might have shifted the probability.
    
    FORMAT:
    Provide a concise summary of the current situation.
    Then, provide exactly 3-4 bullet points under the heading "Key Drivers" with specific details and timestamps if available.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional prediction market analyst specializing in real-time news synthesis. Your goal is to explain the 'Why' behind market odds using the most recent data available.",
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    const text = response.text || "No explanation available.";
    
    // Extract grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title || "Reference",
        uri: chunk.web?.uri || "#"
      }));

    // Improved parsing for drivers
    const lines = text.split('\n');
    const driversIndex = lines.findIndex(l => l.toLowerCase().includes('key drivers'));
    const drivers = lines
      .slice(driversIndex > -1 ? driversIndex + 1 : 0)
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*') || /^\d\./.test(line.trim()))
      .map(line => line.replace(/^[-*]\s*|\d\.\s*/, '').trim());

    return {
      explanation: text,
      drivers: drivers.length > 0 ? drivers : [],
      sources: sources
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
