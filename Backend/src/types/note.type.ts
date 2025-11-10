import Content from "./tiptap.type";

interface Note {
  noteID: string,
  title: string,
  content: Content,
  tags: string[],
  visibility: 'public' | 'private'
}

export default Note