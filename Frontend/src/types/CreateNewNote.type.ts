import type { TagType } from "./tag.type"

export interface CreateNewNote {
  note: {
    title: string,
    tags: TagType[],
    visibility: 'public' | 'private'
  },
  username: string
}