import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
  // baseURL: ""
});

const generateId = () => Math.random().toString(36).slice(2, 15);

export const POST = async (req: Request) => {
  const { messages } = await req.json();

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      {
        id: generateId(),
        role: "system",
        content:
          "You are an excellent coder who knows about everything coding related. You will answer any coding related question with utmost accuracy and in a detailed oriented manner. You could simplify things during explanation so that even those not having enough experience can understand the solution. Also provide examples if appropriate",
      },
      ...messages.map(
        (message: {
          id: string | undefined;
          role: string;
          content: string;
        }) => ({
          id: message.id || generateId(),
          role: message.role,
          content: message.content,
        })
      ),
    ],
    temperature: 0.9,
    maxTokens: 4096,
    topP: 1,
    topK: 1,
  });

  return result.toDataStreamResponse();
};
