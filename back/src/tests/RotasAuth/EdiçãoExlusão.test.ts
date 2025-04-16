import { Request, Response } from "express";
import CamisaController from "../../controllers/CamisaController";
import { updateUser, destroyUserById } from "../../controllers/UserController";
import Camisa from "../../models/CamisaModel";
import UserModel from "../../models/UserModel";

// Mocks
jest.mock("../../models/CamisaModel");
jest.mock("../../models/UserModel");

const mockRes = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  res.send = jest.fn();
  return res;
};

describe("Validação de edição/remoção de recursos inexistentes", () => {
  let res: Response;

  beforeEach(() => {
    res = mockRes();
    jest.clearAllMocks();
  });

  // ========================
  // CamisaController
  // ========================
  describe("CamisaController", () => {
    it("deve retornar 404 ao tentar atualizar uma camisa inexistente", async () => {
      const req = {
        params: { id: "999" },
        body: { nome: "Nova Camisa" },
      } as unknown as Request;

      (Camisa.update as jest.Mock).mockResolvedValue([0]);

      await CamisaController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "não encontrada" });
    });

    it("deve retornar 404 ao tentar deletar uma camisa inexistente", async () => {
      const req = {
        params: { id: "999" },
      } as Request<{ id: string }>;

      (Camisa.destroy as jest.Mock).mockResolvedValue(0);

      await CamisaController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Camisa não encontrada" });
    });
  });

  // userController

  describe("userController", () => {
    it("deve retornar 404 ao tentar atualizar um usuário inexistente", async () => {
      const req = {
        params: { id: "999" },
        body: { name: "Fulano", password: "Senha@123", cpf: "12345678900" },
      } as Request<{ id: string }>;

      (UserModel.findByPk as jest.Mock).mockResolvedValue(null);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Usuário não encontrado",
      });
    });

    it("deve retornar 404 ao tentar deletar um usuário inexistente", async () => {
      const req = {
        params: { id: "999" },
      } as Request<{ id: string }>;

      (UserModel.findByPk as jest.Mock).mockResolvedValue(null);

      await destroyUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });
});
