import { Router } from "express";
import { allNotes, dashboard, editorFetch, editorSave, editorTitleUpdate, findAllTitle, loggedUser, newNote } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/dashboard', dashboard)
userRouter.post('/newnote', newNote)
userRouter.get('/findAllTitle', findAllTitle)
userRouter.get('/editorFetch', editorFetch)
userRouter.post('/editorSave', editorSave)
userRouter.post('/editorTitleUpdate', editorTitleUpdate)
userRouter.get('/allNotes', allNotes)
userRouter.get('/loggedUser', loggedUser)

export default userRouter