import CamisetasModel from "../models/camisetasModel";
import { Request,Response } from "express";

export const getAll = async (req: Request,res: Response) => {
    const camiseta = await CamisetasModel.findAll()
    res.send (camiseta)
}

export const getCamisetasById = async (
    req: Request<{ id: number }>,
    res: Response) => {

        const camisetas = await CamisetasModel.findByPk (req.params.id)

        return res.json(camisetas);
    }
