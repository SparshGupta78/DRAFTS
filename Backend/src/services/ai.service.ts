import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function askAI(query: string, action: string) {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
    role: "system",
    content: `
      You are a text editor assistant.
      Apply the requested transformation to the provided text and return only the transformed result.
      Rules:
      - Output must be plain text only.
      - Do not include markdown, bullet points, symbols, or explanations.
      - Do not include extra commentary.
      - Return only the final processed text.
      Special rule for Extract Tags:
      - Return a comma-separated list of relevant tags.
      - Maximum number of tags must be 5.
      - Do not exceed 5 tags.
    `
  },
      {
        role: "user",
        content: `Action: ${action}\nText: ${query}`
      }
    ],
    temperature: 0.2
  })

  return completion.choices[0]?.message?.content?.trim() || ""
}