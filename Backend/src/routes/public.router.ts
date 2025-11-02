import { Router } from "express"
import { UsernameExistChecker } from "../controllers/public.controller"

const publicRouter = Router()

publicRouter.get('/usernameExistCheck', UsernameExistChecker)

export default publicRouter