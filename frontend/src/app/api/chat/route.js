import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Gemini AI চালু করা (.env.local থেকে key নিয়ে)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI-কে কীভাবে আচরণ করতে হবে তার নির্দেশনা
const systemInstruction = `
You are "KrishiDisha", an agriculture guidance AI built for farmers in Bangladesh.
The user (a farmer) will ask about crops, farming, soil, weather, pests, or diseases.

Rules:
- IMPORTANT: Match the user's language. If they write in English, reply in English. If they write in Bengali, reply in Bengali. If they write in Banglish (Bengali using English letters), reply in Bengali.
- Keep answers short, practical, and easy so an ordinary farmer can understand.
- Give real, useful farming advice.
- If a question is not about agriculture, politely guide them back to farming topics.
`;

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { reply: "অনুগ্রহ করে আপনার প্রশ্ন লিখুন।" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return NextResponse.json({text: reply });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { reply: "দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}