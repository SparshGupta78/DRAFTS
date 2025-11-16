import { Request, Response } from "express";
import { nanoid } from "nanoid";
import UserSchema from '../model/user.model'
import User from "../types/userRes.type";
import Note from "../types/note.type";
import NoteSchema from "../model/note.model"

export const dashboard = async (req: Request, res: Response) => {
  const username = req.query.username as string
  if (!username) {
    return res.status(400).json({error: "Bad request"})
  }
  const user: (User | null) = await UserSchema.findOne({username})
  if (!user) {
    return res.status(404).json({error: "User not found"})
  }
  return res.status(200).json(user)
}

export const newNote = async (req: Request, res: Response) => {
  const note = req.body
  const user = req.user as Omit<User, 'notes'>
  if (!note || !user) {
    return res.status(400).json({error: "Bad request"})
  }
  const noteID = nanoid(30)
  const fnote: Note = {...note, noteID, content: []}
  try {
    const newNote = new NoteSchema(fnote)
    await newNote.save()
    await UserSchema.updateOne(
      {username: user.username},
      {$push: {notes: noteID}}
    )
    return res.status(201).json({noteID})
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}

export const findAllTitle = async (req: Request, res: Response) => {
  try {
    const username = req.query.username as string | null
    const user = req.user as Omit<User, 'notes'>
    if (!username || !user) return res.status(400).json({error: "Bad request"})
    const noteIdsDoc = await UserSchema.findOne(
      {username},
      {notes: 1, _id: 0}
    )
    if (!noteIdsDoc || !noteIdsDoc.notes) return res.status(500).json({error: "Internal server error"})
    const notesIds: string[] = noteIdsDoc.notes
    const notes = await Promise.all(
      notesIds.map(async (noteID) => {
        const note = await NoteSchema.findOne(
          { noteID },
          { _id: 0, noteID: 1, title: 1, visibility: 1}
        )
        return note ? { noteID: note.noteID, title: note.title, visibility: note.visibility } : null
      })
    )
    const filteredNotes = notes.filter((n): n is { noteID: string; title: string, visibility: string } => n !== null)
    if (username !== user.username) {
      const publicNotes = filteredNotes.filter(note => note.visibility === 'public')
      return res.status(200).json({ notes: publicNotes })
    }
    res.status(200).json({ notes: filteredNotes })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

export const editorFetch = async (req: Request, res: Response) => {
  try {
    const noteId = req.query.noteId as string | undefined
    const user = req.user as Omit<User, 'notes'> | undefined
    if (!user || !noteId) return res.status(400).json({error: "Bad request"})
    const username = user.username
    const response = await UserSchema.findOne(
      {username},
      {_id: 0, notes: 1}
    )
    if (!response || !response.notes) return res.status(500).json({error: "Internal server error"})
      const noteResponse = await NoteSchema.findOne({noteID: noteId})
    if (!noteResponse) return res.status(500).json({error: "Internal server error"})
    if (!response.notes.includes(noteId) && noteResponse.visibility === 'private') return res.status(400).json({error: "Unathorized"})
    return res.status(200).json(noteResponse)
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}

export const editorSave = async (req: Request, res: Response) => {
  try {
    const user = req.user as Omit<User, 'notes'> | undefined
    const {noteId, content} = req.body
    if (!user || !noteId || !content) return res.status(400).json({error: "Bad request"})
    const response = await UserSchema.findOne(
      {username: user.username},
      {_id: 0, notes: 1}
    )
    if (!response || !response.notes) return res.status(500).json({error: "Internal server error"})
    if (!response.notes.includes(noteId)) return res.status(400).json({error: "Bad request"})
    const updatedNote = await NoteSchema.findOneAndUpdate(
      {noteID: noteId},
      {$set: {content}}
    )
    if (!updatedNote) return res.status(500).json({error: "Internal server error"})
    res.status(200).json({updatedNote})
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}

export const editorTitleUpdate = async (req: Request, res: Response) => {
  try {
    const user = req.user as Omit<User, 'notes'> | undefined
    const {noteId, title} = req.body
    if (!user || !noteId || !title) return res.status(400).json({error: "Bad request"})
    const response = await UserSchema.findOne(
      {username: user.username},
      {_id: 0, notes: 1}
    )
    if (!response || !response.notes) return res.status(500).json({error: "Internal server error"})
    if (!response.notes.includes(noteId)) return res.status(400).json({error: "Bad request"})
    const updatedNote = await NoteSchema.findOneAndUpdate(
      {noteID: noteId},
      {$set: {title}}
    )
    if (!updatedNote) return res.status(500).json({error: "Internal server error"})
    res.status(200).json({updatedNote})
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}