import { NextRequest, NextResponse } from 'next/server';
import { ChatGPTAPI } from 'chatgpt';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is missing' }, { status: 400 });
    }

    const { prompt } = await req.json();

    const chatGPTAPI = new ChatGPTAPI({
      apiKey: apiKey,
    });

    const response = await chatGPTAPI.sendMessage(prompt);

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
