import type { TagType } from "./tag.type";
import type { Content } from "./tiptap.type";

export interface NoteType {
  noteID: string,
  title: string,
  content: Content,
  tags: TagType[],
  visibility: 'public' | 'private'
}