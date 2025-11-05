import { Request, Response } from "express";
import UserSchema from '../model/user.model'
import User from "../types/userRes.type";

export const dashboard = async (req: Request, res: Response) => {
  const username = req.query.username as string
  if (!username) {
    return res.status(400).json({error: "Bad request"})
  }
  const user: (User | null) = await UserSchema.findOne({username})
  if (!user) {
    return res.status(404).json({error: "User not found"})
  }
  return res.status(200).json({user})
}