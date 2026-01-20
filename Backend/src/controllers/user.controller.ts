import { Request, Response } from "express";
import { nanoid } from "nanoid";
import UserSchema from '../model/user.model';
import UserAuth from "../types/userAuth.type";
import User from "../types/userRes.type";
import Note from "../types/note.type";
import NoteSchema from "../model/note.model"
import bcryptjs from 'bcryptjs'

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
  const fnote: Note = {...note, noteID, content: { type: "doc", content: [] }}
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

export const allNotes = async (req: Request, res: Response) => {
  try {
    const { username } = req.query
    const user = req.user as Omit<User, 'notes'> | undefined
    if (!user || !username) return res.status(400).json({error: "Bad request"})
    const noteIdsDoc = await UserSchema.findOne(
      {username},
      {_id: 0, notes: 1}
    )
    if (!noteIdsDoc || !noteIdsDoc.notes) return res.status(500).json({error: "Internal server error"})
    const notesIds: string[] = noteIdsDoc.notes
    const notes = await Promise.all(notesIds.map(async (noteID: string) => {
      const note = await NoteSchema.findOne({noteID})
      return note ? note : null
    }))
    const filteredNotes = notes.filter((note): note is NonNullable<typeof note> => note !== null)
    if (username === user.username) {
      return res.status(200).json(filteredNotes)
    }
    const publicNotes = filteredNotes.filter((note: { visibility: string }) => note.visibility === 'public')
    return res.status(200).json(publicNotes)
  } catch {
    res.status(500).json({error: "Internal server error"})
  }
}

export const loggedUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as Omit<UserAuth, 'password'> | undefined
    if (!user) return res.status(400).json({error: "Bad request"})
    const userExtended = await UserSchema.findOne(
      {username: user.username},
      {_id: 0, firstName: 1, middleName: 1, lastName: 1, email: 1, username: 1}
    )
    res.status(200).json(userExtended)
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}

export const deleteNote = async (req: Request, res:  Response) => {
  try {
    const {username, noteId} = req.query
    const loggedUser = req.user as Omit<User, 'notes'> | undefined
    if (!username || !noteId || !loggedUser) return res.status(400).json({error: "Bad request"})
    if (username !== loggedUser.username) return res.status(400).json({error: "Bad request"})
    const deleteNote = await NoteSchema.findOneAndDelete({noteID: noteId})
    if (!deleteNote) return res.status(404).json({error: "Note not found"})
    await UserSchema.findOneAndUpdate(
      {username},
      {$pull: {notes: noteId}}
    )
    res.status(204).json({})
   } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}

export const toggleVisibilityStatus = async (req: Request, res: Response) => {
  try {
    const loggedUser = req.user as Omit<User, 'notes'> | undefined
    if (!loggedUser) return res.status(401).json({ error: 'Unauthorized' })
    const {username, noteId, status} = req.query
    if (!username || !noteId || !status) return res.status(400).json({error: "Bad request"})
    if (username !== loggedUser.username) return res.status(400).json({error: "Bad request"})
    const updatedNote = await NoteSchema.findOneAndUpdate(
      {noteID: noteId},
      {$set: {visibility: status}},
      {new: true}
    )
    if (!updatedNote) return res.status(404).json({ error: 'Note not found' })
    if (updatedNote.visibility !== status) return res.status(500).json({error: "Internal server error"})
    return res.status(200).json({ status: updatedNote.visibility })
  } catch {
    res.status(500).json({error: "Internal server error"})
  }
}

export const addTags = async (req: Request, res: Response) => {
  try {
    const loggedUser = req.user as Omit<User, 'notes'> | undefined
    if (!loggedUser) return res.status(401).json({ error: 'Unauthorized' })
    const {username, noteId, tags} = req.body
    if (!username || !noteId || !Array.isArray(tags) || tags.length === 0) return res.status(400).json({error: "Bad request"})
    if (username !== loggedUser.username) return res.status(403).json({error: "Forbidden"})
    const updatedNote = await NoteSchema.findOneAndUpdate(
      {noteID: noteId},
      {$push: {tags: {$each: tags}}},
      {new: true}
    )
    if (!updatedNote) return res.status(404).json({error: "Note not found"})
    res.status(200).json({tags: updatedNote.tags})
  } catch {
    res.status(500).json({error: "Internal server error"})
  }
}

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const loggedUser = req.user as Omit<User, 'notes'> | undefined
    if (!loggedUser) return res.status(401).json({ error: 'Unauthorized' })
    const {username, noteId, tagId} = req.query
    if (!username || !noteId || !tagId) return res.status(400).json({error: "Bad request"})
    if (username !== loggedUser.username) return res.status(403).json({error: "Forbidden"})
    const updatedNote = await NoteSchema.findOneAndUpdate(
      {noteID: noteId},
      {$pull: {tags: {tagId}}},
      {new: true}
    )
    if (!updatedNote) return res.status(404).json({error: "Note not found"})
    res.status(200).json({tags: updatedNote.tags})
  } catch {
    res.status(500).json({error: "Internal server error"})
  }
}

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { password } = req.body
    const loggedUser = req.user as Omit<User, 'notes'> | undefined
    if(!password || !loggedUser) return res.status(400).json({message: "Bad request"})
    const user = await UserSchema.findOne(
      { username: loggedUser.username },
      {_id: 0, password: 1, notes: 1}
    ).lean()
    if(!user) return res.status(500).json({message: "Internal server error"})
    const status = await bcryptjs.compare(password, user.password)
    if(!status) return res.status(401).json({message: "Invalid password"})
    if (user.notes?.length) {
      await NoteSchema.deleteMany({ noteID: { $in: user.notes } })
    }
    await UserSchema.findOneAndDelete({ username: loggedUser.username })
    res.status(200).json({message: "success"})
  } catch {
    res.status(500).json({message: "Internal server error"})
  }
}

export const deleteAllNotes = async (req: Request, res: Response) => {
  try {
    const loggedUser = req.user as Omit<User, 'notes'> | undefined
    if(!loggedUser) return res.status(400).json({message: "Bad request"})
    const user = await UserSchema.findOne(
      {username: loggedUser.username},
      {_id: 0, notes: 1}
    ).lean()
    if(!user) return res.status(500).json({message: "Internal server error"})
    if(user.notes.length > 0) {
      await NoteSchema.deleteMany({noteID: {$in: user.notes}})
    }
    await UserSchema.findOneAndUpdate(
      {username: loggedUser.username},
      {$set: {notes: []}}
    )
    res.status(200).json({message: "success"})
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
  }
}