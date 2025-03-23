import RegistroModel from "../models/RegistroModel";
import { Request,Response } from "express";

export const getAll = async (req: Request,res: Response) => {
    const registroUsers = await RegistroModel.findAll()
    res.send (registroUsers)
}