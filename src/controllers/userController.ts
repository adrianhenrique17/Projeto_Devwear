import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { SENHA_REGEX } from "../models/UserModel";
// A função validateCPF não será utilizada neste fluxo,
// pois vamos comparar o CPF enviado com o CPF já armazenado.
// import { validateCPF } from "../utils/validateCPF";

// Define AuthenticatedUser interface (caso for utilizar autenticação posteriormente)
interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  cpf: string;
  isActive: boolean;
}

// Define AuthenticatedRequest interface (caso for utilizar autenticação posteriormente)
interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

// método que busca por id
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);
  return res.json(user);
};

// método que cria um novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Não deixe nenhum valor suspenso" });
    }

    const user = await UserModel.create({ email, name, password, cpf });
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json("Erro interno no servidor ou CPF já existente " + error);
  }
};

// método que atualiza um usuário
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, password, cpf } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!name || !password || !cpf) {
      return res.status(400).json({
        success: false,
        error:
          "Todos os campos obrigatórios (name, password, cpf) devem ser preenchidos",
      });
    }

    // Validação de senha
    if (!SENHA_REGEX.test(password)) {
      return res.status(400).json({
        success: false,
        error:
          "Senha inválida. A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
      });
    }

    // Busca o usuário no banco de dados pelo id informado na rota
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // CPF enviado deve ser igual ao CPF armazenado (apenas para confirmação)
    if (cpf !== user.cpf) {
      return res.status(400).json({ success: false, error: "CPF inválido" });
    }

    // Atualiza somente os campos que podem ser alterados
    user.name = name;
    user.password = password;
    // O CPF não é alterado, pois serve somente para confirmar a identidade.
    // Exemplo adicional: se houver autenticação, pode-se registrar quem realizou a atualização.
    // user.updatedBy = req.user ? Number(req.user.id) : null;

    await user.save();

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

// método que exclui um usuário
export const destroyUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
