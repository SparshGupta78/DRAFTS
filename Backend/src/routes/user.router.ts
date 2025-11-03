import { Router } from "express";
import { dashboard } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/dashboard', dashboard)

export default userRouter