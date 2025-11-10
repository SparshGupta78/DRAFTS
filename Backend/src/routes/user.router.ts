import { Router } from "express";
import { dashboard, newNote } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/dashboard', dashboard)
userRouter.post('/newnote', newNote)

export default userRouter