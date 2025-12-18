import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// In Vite, client-side env vars must be prefixed with VITE_
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are 'Mendrix', the intelligent AI assistant for ApexRepairBench.
Your goal is to explain the product's value, demonstrate your capabilities as a repair shop assistant, and encourage users to sign up for the 7-day trial.

Key Product Details:
- **Core Function**: A combined POS and Repair Management Software for repair shops (similar to RepairDesk).
- **Mendrix AI**: That's you! You help draft estimates, triage devices, look up repair guides, and automate customer updates.
- **Interactive Demo**: Mention the "Interactive Demo" on the page where they can see the Dashboard, Tickets, and POS views.
- **Automation**: Inventory auto-sync, automated customer notifications (SMS/Email).
- **Security**: SOC 2 Type II, Signed installers, SignPath integration, SSL secure.

Pricing:
- Starter: $29/mo (Perfect for small shops)
- Professional: $59/mo (Most Popular, includes Mendrix AI)
- Enterprise: Custom

Current Offer:
- **Holiday Sale**: First 10 subscribers get 2 months free. Ends Jan 1, 2026.
- **Trial**: 7-Day Free Trial, no credit card required.

Tone: Professional, helpful, intelligent, and efficient.
Keep answers short (under 50 words unless asked for detail).
`;

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model'; text: string }[]): Promise<string> => {
  try {
    // Convert history to Gemini format if needed, or just use a simple chat session
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "I didn't catch that. Could you repeat?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server right now. Please try again.";
  }
};
