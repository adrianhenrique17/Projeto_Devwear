import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import UserModel from "../models/UserModel";

// Interface para o usuário autenticado
interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  cpf: string;
  isActive: boolean;
}

// Interface para o token decodificado
interface DecodedToken {
  id: number;
  email: string;
  // Adicione outros campos do token conforme necessário
}

// Extensão da interface Request do Express
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
  // 1. Extrai o token do header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Acesso não autorizado",
      message: "Token de acesso não fornecido",
    });
  }

  try {
    // 2. Verifica e decodifica o token
    const decoded = verifyToken(token) as DecodedToken;

    // 3. Busca o usuário no banco
    const user = await UserModel.findOne({
      where: {
        id: decoded.id,
        isActive: true, // Verifica se o usuário está ativo
      },
      attributes: { exclude: ["password"] }, // Não retorna a senha
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Acesso não autorizado",
        message: "Usuário não encontrado ou conta desativada",
      });
    }

    // 4. Adiciona o usuário à requisição
    req.user = {
      id: user.id!,
      email: user.email!,
      name: user.name!,
      cpf: user.cpf!.toString(),
      isActive: user.isActive!,
    };

    // 5. Continua para a próxima middleware/controller
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
