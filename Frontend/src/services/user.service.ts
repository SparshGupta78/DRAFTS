import type { CreateNewNote } from "../types/CreateNewNote.type";
import api from "./axios.config";

export const newNoteAPI = (payload: CreateNewNote) => api.post('/user/newnote', payload)
export const sideBarNotesAPI = async () => {
  const res = await api.get('/user/findAllTitle')
  return res.data.notes
}