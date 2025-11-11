import { Router } from "express";
import { dashboard, findAllTitle, newNote } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/dashboard', dashboard)
userRouter.post('/newnote', newNote)
userRouter.get('/findAllTitle', findAllTitle)

export default userRouter