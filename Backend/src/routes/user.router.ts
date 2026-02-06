import { Router } from "express";
import { addTags, allNotes, dashboard, deleteAccount, deleteAllNotes, deleteNote, deleteTag, editorFetch, editorSave, editorTitleUpdate, findAllTitle, loggedUser, newNote, resetPassword, toggleVisibilityStatus, updateUserDetails } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/dashboard', dashboard)
userRouter.post('/newnote', newNote)
userRouter.get('/findAllTitle', findAllTitle)
userRouter.get('/editorFetch', editorFetch)
userRouter.post('/editorSave', editorSave)
userRouter.post('/editorTitleUpdate', editorTitleUpdate)
userRouter.get('/allNotes', allNotes)
userRouter.get('/loggedUser', loggedUser)
userRouter.get('/deleteNote', deleteNote)
userRouter.get('/deleteAllNotes', deleteAllNotes)
userRouter.get('/toggleVisibilityStatus', toggleVisibilityStatus)
userRouter.post('/addTag', addTags)
userRouter.get('/deleteTag', deleteTag)
userRouter.post('/deleteAccount', deleteAccount)
userRouter.post('/updateUserDetails', updateUserDetails)
userRouter.post('/resetPassword', resetPassword)

export default userRouter