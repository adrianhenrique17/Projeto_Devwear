import { updateUser } from "../../controllers/userController";
import { Request, Response } from "express";
import UserModel, { SENHA_REGEX } from "../../models/UserModel";

// Mock do UserModel e da regex
jest.mock("../../models/UserModel", () => ({
  __esModule: true,
  default: {
    findByPk: jest.fn(),
  },
  SENHA_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
}));

const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();
  return res;
};

describe("updateUser - Validação de campos obrigatórios", () => {
  let res: Response;

  beforeEach(() => {
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar 400 se algum campo obrigatório estiver faltando", async () => {
    const req = {
      params: { id: "1" },
      body: {
        name: "João", // faltando senha e cpf
      },
    } as Request<{ id: string }>;

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error:
          "Todos os campos obrigatórios (name, password, cpf) devem ser preenchidos",
      })
    );
  });

  it("deve retornar 400 se a senha for inválida", async () => {
    const req = {
      params: { id: "1" },
      body: {
        name: "Maria",
        password: "123", // senha fraca
        cpf: "12345678900",
      },
    } as Request<{ id: string }>;

    (UserModel.findByPk as jest.Mock).mockResolvedValue({
      cpf: "12345678900",
      save: jest.fn(),
    });

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.stringContaining("Senha inválida"),
      })
    );
  });

  it("deve retornar 400 se o CPF enviado for diferente do do banco", async () => {
    const req = {
      params: { id: "1" },
      body: {
        name: "Maria",
        password: "Senha@123",
        cpf: "99999999999", // diferente do mock
      },
    } as Request<{ id: string }>;

    (UserModel.findByPk as jest.Mock).mockResolvedValue({
      cpf: "12345678900",
      save: jest.fn(),
    });

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "CPF inválido",
      })
    );
  });
});
