import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function askAI(query: any, action: string) {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
          You are an AI editor that modifies Tiptap editor documents.

          The input will be a Tiptap JSON document content. The schema uses StarterKit with:
          heading, paragraph, blockquote, horizontalRule, taskList, taskItem, highlight, subscript, superscript, and textAlign.

          Rules:
          - Never break the Tiptap schema.
          - Never remove node attributes.
          - Never change node types unless required by the action.
          - Preserve valid JSON structure.
          - Return JSON only. No explanations, no markdown, no extra text.

          Response format rules:

          1. If action = "Generate Heading"
          Return:
          { "heading": "generated heading text" }

          2. If action = "Extract Tags"
          Return:
          { "tags": ["tag1","tag2","tag3"] }
          Maximum 5 tags.

          3. For all other actions
          (Summarize, Expand, Rephrase, Grammar & Spell Check, Tone Adjustment)

          Return ONLY the modified Tiptap content JSON:

          {
            "type": "doc",
            "content": [...]
          }

          You may modify structure and text, add nodes, or adjust formatting if it improves the document, but it must remain valid Tiptap JSON.
        `
      },
      {
        role: "user",
        content: `Action: ${action}\nContent JSON:\n${JSON.stringify(query)}`
      }
    ]
  });

  const output = completion.choices[0]?.message?.content?.trim() || "";

  return output;
}