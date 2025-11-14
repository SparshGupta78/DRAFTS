import { Router } from "express";
import { dashboard, editorFetch, editorSave, editorTitleUpdate, findAllTitle, newNote } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/dashboard', dashboard)
userRouter.post('/newnote', newNote)
userRouter.get('/findAllTitle', findAllTitle)
userRouter.get('/editorFetch', editorFetch)
userRouter.post('/editorSave', editorSave)
userRouter.post('/editorTitleUpdate', editorTitleUpdate)

export default userRouter