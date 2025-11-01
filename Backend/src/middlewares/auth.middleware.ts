import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) { return res.status(401).json({ error: 'Unauthorized' }) }
  const token = authHeader.split(' ')[1]
  if (!token) { return res.status(401).json({ error: "Unauthorized" }) }
  try {
    jwt.verify(
      token, 
      process.env.JWT_SECRET_KEY as string, 
      (err, decoded) => {
        if (err || !decoded) {
          return res.status(401).json({ error: "Unauthorized" })
        }
        req.user = decoded
        next()
      }
    )
  } catch (err) {
    res.status(500).json({ error: "Internal server error" })
  }
}