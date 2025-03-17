import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Using the latest Gemini model
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(req) {
  try {
    const { date, location } = await req.json();

    // 🔹 Validate inputs
    if (!date || !location) {
      return new Response(JSON.stringify({ error: "Missing date or location" }), { status: 400 });
    }

    const chatSession = model.startChat({ generationConfig, history: [] });

    const query = `Generate a detailed 3-day travel itinerary for ${location} on ${date}. 
    Include must-visit places, food recommendations, and activities. 
    Format it in clear bullet points.`; 

    // 🔹 Corrected sendMessage call (passing a string, not an object)
    const result = await chatSession.sendMessage(query);

    if (!result || !result.response) {
      console.error("Invalid Gemini response:", result);
      return new Response(JSON.stringify({ error: "Invalid Gemini API response" }), { status: 500 });
    }

    const itinerary = await result.response.text(); // ✅ Fix: Ensure it's awaited

    return new Response(JSON.stringify({ itinerary }), { status: 200 });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
  }
}
