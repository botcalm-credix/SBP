import { GoogleGenAI } from "@google/genai";
import { Match } from "../types";

// Use import.meta.env.API_KEY for Vite
const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.API_KEY || "" });

export const getMatchInsight = async (match: Match): Promise<string> => {
  try {
    const prompt = `
      You are a professional sports betting analyst. 
      Analyze this match briefly: ${match.homeTeam.name} vs ${match.awayTeam.name} in the ${match.league}.
      The current odds are: Home Win: ${match.odds.home}, Draw: ${match.odds.draw}, Away Win: ${match.odds.away}.
      Status: ${match.status}. ${match.score ? `Current Score: ${match.score.home}-${match.score.away}` : ''}.
      
      Provide a short, punchy insight about the likely outcome or a key stat to consider. Max 2 sentences.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No insight available at this moment.";
  } catch (error) {
    console.error("Error fetching match insight:", error);
    return "Unable to retrieve AI insight at this time.";
  }
};

export const chatWithAI = async (message: string, context?: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        System: You are a helpful sports betting assistant called BetBot. You help users understand odds, rules, and stats.
        Context: ${context || 'General betting query'}
        User: ${message}
      `,
    });
    return response.text || "I couldn't process that.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, I'm having trouble connecting to the server.";
  }
};

export const generateMatchBanner = async (matchTitle: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      // Updated prompt for interactive gaming style
      contents: `Create a high-fidelity, 8k resolution, futuristic video game style concept art for a football match: ${matchTitle}. Unreal Engine 5 aesthetic, neon lighting, stadium atmosphere, dynamic camera angle, competitive gaming feel, no text.`,
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error generating match banner:", error);
    return null;
  }
};