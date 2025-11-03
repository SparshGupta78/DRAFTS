import { Request, Response } from "express"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import USER from "../types/userAuth.type"
import User from '../model/User.model'

dotenv.config()

export const signup = async (req: Request, res: Response) => {
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

  try {
    const existingUser: (USER | null) = await User.findOne({username})
    if (existingUser) {
      return res.status(409).json({error: "Username already taken"})
    }
    const hashedPassword = await bcryptjs.hash(password, 16)  
    const newUser = new User({firstName, middleName, lastName, email, username, password: hashedPassword})
    await newUser.save()
  } catch (error) {
    return res.status(500).json({error: "Internal server error"})
  }

  try {
    const token = jwt.sign(
      {firstName, middleName, lastName, username},
      process.env.JWT_SECRET_KEY as string,
      {expiresIn: '1h'}
    )
    if (!token) { return res.status(500).json({error: 'Internal server error'}) }
    return res.status(200).json({token})
  } catch (err) {
    res.status(500).json({error: "Internal server error"})
  }
}

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) { return res.status(400).json({ error: "Bad Request" }) }
  
  try {
    const existingUser: (USER | null) = await User.findOne({username})
    if (!existingUser) {
      return res.status(400).json({error: "User not found"})
    }
    const passwordMatch = await bcryptjs.compare(password, existingUser.password)
    if (!passwordMatch) {
      return res.status(400).json({error: "Invalid credentials"})
    }
    const token = jwt.sign(
      {
        firstName: existingUser.firstName,
        middleName: existingUser.middleName,
        lastName: existingUser.lastName,
        username: existingUser.username
      }, 
      process.env.JWT_SECRET_KEY as string, 
      {expiresIn: '1h'}
    )
    if (!token) { return res.status(500).json({ error: "Internal server error" }) }
    res.status(200).json({ token })
  } catch (err) {
    res.status(500).json({ error: "Internal server error" })
  }
}