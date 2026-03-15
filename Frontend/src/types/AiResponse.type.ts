import type { JSONContent } from "@tiptap/core"

export type actionType = '' | 'Generate Heading' | 'Extract Tags' | 'Summarize' | 'Expand' | 'Rephrase' | 'Grammar & Spell Check' | 'Formal' | 'Casual' | 'Professional' | 'Academic' | 'Creative'

type headingType = {
  heading: string
}

type tagsType = {
  tags: string[]
}

type response = JSONContent | headingType | tagsType | undefined

export type AIResponse = {
  response: response,
  action: actionType
}