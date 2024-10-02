import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API key is not defined");
}

export async function POST(req: NextRequest) {
  const { body: prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
  }

  // Instead of having a long prompt, we can use a made up chat history to generate a response
  // This is useful for chatbots or conversational AI
  // The prompt should be in the format: "Answer only: <prompt>"
  // Example: "Answer only: x-5 = 10"
  // Here we construct a fake chat history to make the AI generate a response under JSON format
  let chatHistory = [
    {
      role: "user",
      parts: [
        {
          text: "Answer in human-like syntax, such as x = 3, y = 4,... for equation and provide answer for non equation. If long decimal, round to the fourth. If not solvable, explain concisely.",
        },
      ],
    },
    {
      role: "model",
      parts: [{ text: "I have understood." }],
    },
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  try {
    const genAI = new GoogleGenerativeAI(apiKey as string);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    // Fetch the generated content
    const result = await model.generateContent({
      contents: chatHistory,
      generationConfig: {
        temperature: 1,
        maxOutputTokens: 2000,
      },
    });

    // Check for any blocking issues
    if (
      result.response.promptFeedback?.blockReason ||
      !result.response.candidates ||
      result.response.candidates.length === 0
    ) {
      return NextResponse.json(
        { error: "Failed to generate a valid response" },
        { status: 500 }
      );
    }

    // Extract generated text from the response
    // Note: The response may contain multiple candidates(data entries), but we only need the first one
    const generatedText = result.response.candidates[0].content.parts[0].text;

    return NextResponse.json({ text_content: generatedText }, { status: 200 });
  } catch (error) {
    console.error("Error while generating content:", error);
    return NextResponse.json(
      { error: "Error generating content" },
      { status: 500 }
    );
  }
}
