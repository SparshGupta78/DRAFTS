import { getSchema } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

export const extractTextFromJSON = (json: any) => {
  const schema = getSchema([StarterKit])
  const doc = schema.nodeFromJSON(json)
  return doc.textBetween(0, doc.content.size, "\n")
}
