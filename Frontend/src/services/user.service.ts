import type { CreateNewNote } from "../types/CreateNewNote.type";
import type { Content } from "../types/tiptap.type";
import api from "./axios.config";

export const dashboardAPI = (username: string) => api.get(`/user/dashboard?username=${username}`)

export const newNoteAPI = (payload: CreateNewNote) => api.post('/user/newnote', payload)

export const sideBarNotesAPI = async (username: string) => {
  const res = await api.get(`/user/findAllTitle?username=${username}`)
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

export const AllNotesAPI = (username: string) => api.get(`/user/allNotes?username=${username}`)