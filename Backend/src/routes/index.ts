import { Router } from "express"
import authRouter from "./auth.router"
import publicRouter from "./public.router"
import userRouter from "./user.router"
import { auth } from "../middlewares/auth.middleware"

const router = Router()

router.use('/auth', authRouter)
router.use('/user', auth, userRouter)
router.use('/public', publicRouter)

export default router