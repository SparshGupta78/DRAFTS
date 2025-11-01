import { Request, Response } from "express"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from "../types/user.type"

dotenv.config()

export const signup = (req: Request, res: Response) => {
  const {firstName, middleName, lastName, email, username, password} = req.body
  if (
    !firstName || 
    !lastName || 
    !email || 
    !username || 
    !password
  ) {
    return res.status(400).json({error: "Bad Request"})
  }
  const user: User = {firstName, middleName, lastName, email, username, password}

  //database store

  try {
    const token = jwt.sign(
      user, 
      process.env.JWT_SECRET_KEY as string,
      {expiresIn: '1h'}
    )
    if (!token) { return res.status(500).json({error: 'Internal server error'}) }
    return res.status(200).json({user: {firstName, middleName, lastName, username}, token})
  } catch (err) {
    res.status(500).json({error: "Internal server error"})
  }
}

export const signin = (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) { return res.status(400).json({ error: "Bad Request" }) }

  //database verification...

  const user = {
    firstName: "sparsh",
    middleName: "",
    lastName: "gupta",
    username: "spar123"
  }
  try {
    const token = jwt.sign(
      user, 
      process.env.JWT_SECRET_KEY as string, 
      {expiresIn: '1h'}
    )
    if (!token) { return res.status(500).json({ error: "Internal server error" }) }
    res.status(200).json({ user, token })
  } catch (err) {
    res.status(500).json({ error: "Internal server error" })
  }
}