import { Request, Response } from "express";
import { authenticateUser } from "../services/authService";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await authenticateUser(email, password);
    res.json({ token });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(401).json({ message: errorMessage });
  }
};
