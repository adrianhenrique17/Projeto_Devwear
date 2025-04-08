import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import UserModel from "../models/UserModel";


interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  cpf: string;
  isActive: boolean;
}

//token decodificado
interface DecodedToken {
  id: number;
  email: string;
}


declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extrai o token do header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Acesso não autorizado",
      message: "Token de acesso não fornecido",
    });
  }

  try {
  
    const decoded = verifyToken(token) as DecodedToken;

    // User no banco
    const user = await UserModel.findOne({
      where: {
        id: decoded.id,
        isActive: true,
      },
      attributes: { exclude: ["password"] }, // sem senha
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Acesso não autorizado",
        message: "Usuário não encontrado ou conta desativada",
      });
    }

    
    req.user = {
      id: user.id!,
      email: user.email!,
      name: user.name!,
      cpf: user.cpf!.toString(),
      isActive: user.isActive!,
    };

  
    next();
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return res.status(401).json({
      success: false,
      error: "Acesso não autorizado",
      message: "Token inválido ou expirado",
    });
  }
};
