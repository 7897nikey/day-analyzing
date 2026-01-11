
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    diary: {
      type: Type.OBJECT,
      properties: {
        date: { type: Type.STRING },
        title: { type: Type.STRING },
        mood: { type: Type.STRING },
        summary: { type: Type.STRING },
        keyEvents: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        reflections: { type: Type.STRING }
      },
      required: ["date", "title", "mood", "summary", "keyEvents", "reflections"]
    },
    schedule: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          time: { type: Type.STRING },
          task: { type: Type.STRING },
          participants: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          location: { type: Type.STRING }
        },
        required: ["time", "task", "participants"]
      }
    },
    topTopics: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ["diary", "schedule", "topTopics"]
};

export const analyzeChatLog = async (chatLog: string): Promise<AnalysisResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following KakaoTalk chat log for a single day. 
    1. Write a reflective and emotive diary entry based on the interactions. 
    2. Extract a structured schedule of events, tasks, and meetings discussed.
    3. Identify the top 3 most discussed topics.
    
    Chat Log Content:
    ${chatLog}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      systemInstruction: "You are an expert biographer and personal assistant. Your tone for the diary should be warm, observant, and insightful. For the schedule, be precise and structured. The output language must be Korean."
    },
  });

  const result = JSON.parse(response.text || '{}');
  return result as AnalysisResult;
};
