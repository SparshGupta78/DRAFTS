import type { CreateNewNote } from "../types/CreateNewNote.type";
import api from "./axios.config";

export const newNoteAPI = (payload: CreateNewNote) => api.post('/user/newnote', payload)