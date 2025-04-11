import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import UserModel from "../../models/UserModel";
import jwt from "jsonwebtoken";

// Mock completo do UserModel
jest.mock("../../models/UserModel", () => ({
  findOne: jest.fn(),
}));

const mockUser = {
  id: 1,
  email: "user@test.com",
  name: "Test User",
  cpf: "12345678909",
  isActive: true,
};

// Helpers para simulação
const mockRequest = (headers: any, params: any = {}) =>
  ({
    header: (name: string) => headers[name],
    params,
    user: undefined,
  } as unknown as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

const mockNext = jest.fn() as NextFunction;

describe("Middleware de Autenticação e Controle de Acesso", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Cenário: Usuário tenta editar dados de outro usuário", () => {
    test("Deve bloquear acesso com status 403", async () => {
      // Mock do token válido para usuário ID 1
      const token = jwt.sign({ id: 1 }, "YuriPaiDoPeixeEporco");

      // Configurar request para tentar editar usuário ID 2
      const req = mockRequest(
        { Authorization: `Bearer ${token}` },
        { id: "2" } // ID diferente do usuário autenticado
      );

      const res = mockResponse();

      // Mock do UserModel retornar usuário válido
      (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

      await authMiddleware(req, res, mockNext);

      // Verificar se o middleware bloqueou o acesso
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Acesso proibido",
        message: "Você só pode editar seus próprios dados",
      });
    });
  });

  describe("Cenário: Usuário edita seus próprios dados", () => {
    test("Deve permitir o acesso e chamar next()", async () => {
      // Mock do token válido para usuário ID 1
      const token = jwt.sign({ id: 1 }, "YuriAlbertopaidoporcoepeixe");

      // Configurar request para editar usuário ID 1
      const req = mockRequest(
        { Authorization: `Bearer ${token}` },
        { id: "1" } // Mesmo ID do usuário autenticado
      );

      const res = mockResponse();

      // Mock do UserModel retornar usuário válido
      (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

      await authMiddleware(req, res, mockNext);

      // Verificar se o acesso foi permitido
      expect(mockNext).toHaveBeenCalled();
      expect(req.user).toEqual({
        id: 1,
        email: "user@test.com",
        name: "Test User",
        cpf: "12345678909",
        isActive: true,
      });
    });
  });

  describe("Cenário: Token inválido ou ausente", () => {
    test("Deve retornar erro 401 para token ausente", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await authMiddleware(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Acesso não autorizado",
        message: "Token de acesso não fornecido",
      });
    });

    test("Deve retornar erro 401 para token inválido", async () => {
      const req = mockRequest({ Authorization: "Bearer token_invalido" });
      const res = mockResponse();

      await authMiddleware(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Acesso não autorizado",
        message: "Token inválido ou expirado",
      });
    });
  });
});
