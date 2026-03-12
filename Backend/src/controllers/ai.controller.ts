import { Request, Response } from "express";
import { askAI } from "../services/ai.service";

export const query = async (req: Request, res: Response) => {
  try {
    const { query, action } = req.body
    if(!query || !action) return res.status(400).json({ message: "Insufficient field(s) detail" })
    if(typeof query != "string" || typeof action != "string") return res.status(400).json({message: "Invalid field(s) format"})
    const response = await askAI(query, action)
    res.status(200).json({ message: "OK", response })
  } catch(error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}