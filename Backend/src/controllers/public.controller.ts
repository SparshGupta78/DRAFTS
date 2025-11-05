import { Request, Response } from "express";
import UserSchema from '../model/user.model'

export const UsernameExistChecker = async (req: Request, res: Response) => {
  const username = req.query.username as string
  if (!username) {
    return res.status(400).json({error: "Bad request"})
  }
  const existingUsername = await UserSchema.findOne({username})
  if (existingUsername) {
    res.status(200).json({matched: true})
  } else {
    res.status(200).json({matched: false})
  }
}