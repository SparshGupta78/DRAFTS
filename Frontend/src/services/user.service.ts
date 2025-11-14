import type { CreateNewNote } from "../types/CreateNewNote.type";
import type { Content } from "../types/tiptap.type";
import api from "./axios.config";

export const newNoteAPI = (payload: CreateNewNote) => api.post('/user/newnote', payload)
export const sideBarNotesAPI = async () => {
  const res = await api.get('/user/findAllTitle')
  return res.data.notes
}
export const EditorFetchAPI = async (noteId: string) => {
  const response = await api.get(`/user/editorFetch?noteId=${noteId}`)
  return response.data
}

export const EditorContentSaveAPI = (noteId: string, content: Content, signal: AbortSignal) => api.post(
  '/user/editorSave',
  { noteId, content },
  { signal }
)

export const EditorTitleUpdateAPI = (noteId: string, title: string) => api.post('/user/editorTitleUpdate', {noteId, title})