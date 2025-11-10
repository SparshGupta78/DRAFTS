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
  return res.status(200).json({user})
}

export const newNote = async (req: Request, res: Response) => {
  const { note, username } = req.body
  const user = req.user as Omit<User, 'notes'>
  if (!note || !username || !user) {
    return res.status(400).json({error: "Bad request"})
  }
  if (username !== user.username) {
    return res.status(403).json({error: "Unauthorized request"})
  } 
  const noteID = nanoid(30)
  const fnote: Note = {...note, noteID, content: []}
  try {
    const newNote = new NoteSchema(fnote)
    await newNote.save()
    await UserSchema.updateOne(
      {username},
      {$push: {notes: noteID}}
    )
    return res.status(201).json({noteID})
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}