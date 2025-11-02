import { Request, Response } from "express";
import user from '../model/User.model'

export const UsernameExistChecker = async (req: Request, res: Response) => {
  const username = req.query.username as string
  if (!username) {
    return res.status(400).json({error: "Bad request"})
  }
  const existingUsername = await user.findOne({username})
  if (existingUsername) {
    res.status(200).json({matched: true})
  } else {
    res.status(200).json({matched: false})
  }
}