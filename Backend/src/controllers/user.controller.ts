import { Request, Response } from "express";
import User from '../model/User.model'
import USER from "../types/userRes.type";

export const dashboard = async (req: Request, res: Response) => {
  const username = req.query.username as string
  if (!username) {
    return res.status(400).json({error: "Bad request"})
  }
  const user: (USER | null) = await User.findOne({username})
  if (!user) {
    return res.status(404).json({error: "User not found"})
  }
  return res.status(200).json({user})
}