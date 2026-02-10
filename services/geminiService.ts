import { GoogleGenAI } from "@google/genai";
import { Character, Message } from '../types';

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const generateCharacterReply = async (
  character: Character,
  history: Message[],
  userMessage: string
): Promise<string> => {
  const client = getAI();
  const modelId = "gemini-3-flash-preview";
  
  // Format history for context
  const conversationHistory = history.map(msg => 
    `${msg.sender === 'user' ? 'Manager' : character.name}: ${msg.text}`
  ).join('\n');

  const prompt = `
    ${character.geminiSystemInstruction}
    
    Context: You are currently chatting via Direct Message (DM) on a social media app with the WESCENT Casting Manager.
    Your goal is to show your personality, your struggles, and your passion for debuting in FLONE.
    Keep the response concise (under 2 sentences usually) and authentic to a text message style.
    
    Previous Conversation:
    ${conversationHistory}
    
    Manager: ${userMessage}
    ${character.name}:
  `;

  try {
    const response = await client.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text?.trim() || "...";
  } catch (error) {
    console.error("Error generating reply:", error);
    return "이런, 데이터 연결이 불안정해요. (API Error)";
  }
};

export const generateStoryLogline = async (): Promise<string> => {
   const client = getAI();
   const prompt = `
     Write a poetic, emotional, 2-line intro for a story called "FLONE" about 5 girls training to debut. 
     Focus on "uncertainty" and "shining moments". Korean language.
   `;
   try {
     const response = await client.models.generateContent({
       model: 'gemini-3-flash-preview',
       contents: prompt
     });
     return response.text?.trim() || "흔들리는 계절 끝에서, 우리는 서로의 이름이 되었다.";
   } catch (e) {
     return "흔들리는 계절 끝에서, 우리는 서로의 이름이 되었다.";
   }
}
