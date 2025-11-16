import type { TagType } from "./tag.type"

export interface CreateNewNote {
  title: string,
  tags: TagType[],
  visibility: 'public' | 'private'
}