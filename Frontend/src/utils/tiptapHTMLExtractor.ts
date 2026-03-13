import type { JSONContent } from '@tiptap/core'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'

export const extractHTML = (json: JSONContent) => {
  const extensions = [
    StarterKit,
    Subscript,
    Superscript,
    Highlight,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TaskList,
    TaskItem.configure({ nested: true })
  ]
  return generateHTML(json, extensions)
}