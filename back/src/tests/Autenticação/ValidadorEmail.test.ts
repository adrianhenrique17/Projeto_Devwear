import { Request, Response } from "express";
import LoginController from "../../controllers/LoginController";

describe("LoginController - Validação de e-mail e senha obrigatórios", () => {
  const loginController = new LoginController();

  const mockJson = jest.fn();
  const mockStatus = jest.fn(() => ({ json: mockJson }));
  const res = {
    status: mockStatus,
    json: mockJson,
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "YuriAlbertopaidoporcoepeixe";
  });

  test("deve retornar erro 400 se o e-mail estiver ausente", async () => {
    const req = {
      body: {
        password: "Senha123@",
      },
    } as Request;

    await loginController.login(req, res);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      success: false,
      error: "Email e senha são obrigatórios",
    });
  });

  test("deve retornar erro 400 se a senha estiver ausente", async () => {
    const req = {
      body: {
        email: "usuario@email.com",
      },
    } as Request;

    await loginController.login(req, res);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      success: false,
      error: "Email e senha são obrigatórios",
    });
  });
});
