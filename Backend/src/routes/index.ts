import { Router } from "express"
import authRouter from "./auth.router"
import publicRouter from "./public.router"

const router = Router()

router.use('/auth', authRouter)
router.use('/public', publicRouter)

export default router