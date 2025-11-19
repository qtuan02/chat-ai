import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  console.log("messages", messages);

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
  });

  console.log("result", result);

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
