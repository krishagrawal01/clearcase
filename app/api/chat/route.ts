import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { message, topic } = await req.json();

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1000,
    system: `You are ClearCase, an AI legal guidance assistant 
    specialized exclusively in Indian law. 
    Current legal topic: ${topic || "General Legal Query"}.
    Only answer questions related to Indian law, legal procedures, 
    court processes, IPC sections, divorce under Hindu Marriage Act, 
    traffic challans, property disputes, and document requirements.
    If asked anything unrelated to Indian law, respond exactly with:
    "I am ClearCase, specialized in Indian legal guidance only. 
    I cannot help with that query. Please ask me something 
    related to Indian law."
    Always end every response with a new line:
    "⚠️ Disclaimer: This is AI-assisted guidance, not legal advice. 
    Please consult a qualified lawyer for final decisions."`,
    messages: [{ role: "user", content: message }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  return Response.json({ reply: text });
}