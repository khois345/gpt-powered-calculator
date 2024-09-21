import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;

if (!apiKey) {
  throw new Error("API key is not defined");
}

export async function POST(req: NextRequest) {
  const { body: prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Fetch the generated content
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
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
    return NextResponse.json({ error: "Error generating content" }, { status: 500 });
  }
}
