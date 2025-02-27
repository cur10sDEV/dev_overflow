import Groq from "groq-sdk";
import { NextResponse } from "next/server";
const groq = new Groq();

export const POST = async (req: Request) => {
  const { question } = await req.json();

  try {
    // const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content:
    //           "You're a knowledgeable assistant that provides quality information.",
    //       },
    //       { role: "user", content: `Tell me ${question}` },
    //     ],
    //   }),
    // });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You're a knowledgeable assistant that provides quality information.",
        },
        {
          role: "user",
          content: `Provide me an answer to this question: ${question}`,
        },
      ],
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.6,
      max_completion_tokens: 4096,
      top_p: 0.95,
      stream: true,
      stop: null,
    });

    let reply = "";

    for await (const chunk of chatCompletion) {
      reply += chunk.choices[0]?.delta?.content || "";
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
