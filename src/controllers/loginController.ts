import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class loginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // 1. Validação dos campos obrigatórios
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Campos obrigatórios faltando",
        details: "E-mail e senha são necessários",
      });
    }

    try {
      // 2. Busca o usuário no banco de dados
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Credenciais inválidas",
          details: "Nenhum usuário cadastrado com este e-mail",
        });
      }

      // 3. Verifica se o usuário está ativo
      if (user.getDataValue("isActive") === false) {
        return res.status(403).json({
          success: false,
          error: "Acesso negado",
          details: "Sua conta está desativada. Entre em contato com o suporte.",
        });
      }

      // 4. Valida a senha
      const isValidPassword = await bcrypt.compare(password, user.password!);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: "Credenciais inválidas",
          details: "Senha incorreta",
        });
      }

      // 5. Gera o token JWT
      const token = this.generateToken(user);

      // 6. Retorna os dados do usuário (sem a senha)
      const userData = user.toJSON();
      delete userData.password;

      return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        user: userData,
        token,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({
        success: false,
        error: "Erro interno no servidor",
        details: "Ocorreu um erro ao processar seu login",
      });
    }
  }

  // Método para gerar token (se preferir separado)
  private generateToken(user: UserModel): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "defaultSecret",
      {
        expiresIn: process.env.JWT_EXPIRES_IN
          ? parseInt(process.env.JWT_EXPIRES_IN)
          : "8h",
      }
    );
  }
}

export default new loginController();
