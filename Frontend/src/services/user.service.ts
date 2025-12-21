import type { CreateNewNote } from "../types/CreateNewNote.type";
import type { TagType } from "../types/tag.type";
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

export const loggedUserAPI = () => api.get(`/user/loggedUser`)

export const DeleteNoteAPI = (username: string, noteId: string) => api.get(`/user/deleteNote?username=${username}&noteId=${noteId}`)

export const ToggleVisibilityStatusAPI = (username: string, noteId: string, status: ('private' | 'public')): Promise<'public' | 'private'> => api.get(`/user/toggleVisibilityStatus?username=${username}&noteId=${noteId}&status=${status}`)

export const AddTagAPI = (username: string, noteId: string, tags: TagType[]) => api.post('/user/addTag', {username,noteId,tags})

export const DeleteTagAPI = (username: string, noteId: string, tagId: string) => api.get(`/user/deleteTag?username=${username}&noteId=${noteId}&tagId=${tagId}`)