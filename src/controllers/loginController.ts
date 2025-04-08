import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// váriaveis de ambiente
dotenv.config();

interface IUserTokenPayload extends JwtPayload {
  id: number;
  email: string;
}


// Post no login

class LoginController {
  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email e senha são obrigatórios",
      });
    }

    try {
      const user = await UserModel.findOne({
        where: { email },
        attributes: { include: ["password"] },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Credenciais incorretas",
        });
      }

      if (!user.id || isNaN(user.id)) {
        return res.status(500).json({
          success: false,
          error: "Erro no sistema: ID de usuário inválido",
        });
      }

      if (!user.getDataValue("isActive")) {
        return res.status(403).json({
          success: false,
          error: "Conta desativada ou exluída",
        });
      }

      if (!user.password) {
        return res.status(500).json({
          success: false,
          error: "Erro no sistema: Senha do usuário não encontrada",
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: "Credenciais inválidas",
        });
      }

      const token = this.generateToken(user);
      const userData = this.sanitizeUser(user);

      return res.json({
        success: true,
        user: userData,
        token,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({
        success: false,
        error: "Erro no servidor",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  private generateToken = (user: UserModel): string => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado. Verifique o arquivo .env.");
    }

    const payload: IUserTokenPayload = {
      id: user.id!,
      email: user.email!,
    };

    const options: SignOptions = {
      expiresIn: process.env.JWT_EXPIRES_IN || "8h",
    };

    //Jwt vai ter duração de 8hrs

    return jwt.sign(payload, JWT_SECRET, options);
  };

  private sanitizeUser = (user: UserModel): Omit<UserModel, "password"> => {
    const userData = user.get({ plain: true });
    const { password, ...userWithoutPassword } = userData;
    return userWithoutPassword;
  };
}

export default LoginController;
