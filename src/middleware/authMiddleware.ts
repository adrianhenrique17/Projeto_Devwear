import { NextFunction, Request, Response } from "express";

// Extende a interface Request para incluir a propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any; // Substitua 'any' pelo tipo correto, se disponível
    }
  }
}
import { verifyToken } from "../utils/jwt";
import UserModel from "../models/UserModel"; // Importe seu modelo de usuário

interface DecodedToken {
  id: number;
  email: string;
  // Adicione outros campos do token conforme necessário
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

    // 3. Busca o usuário no banco para verificar se ainda existe/está ativo
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

    // 4. Adiciona o usuário à requisição (em req.user em vez de req.body)
    req.user = user.get({ plain: true });

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
