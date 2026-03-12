import { Router } from "express";
import { query } from "../controllers/ai.controller";

const aiRouter = Router()

aiRouter.post('/query', query)

export default aiRouter