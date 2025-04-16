import { Request, Response } from "express";
import LoginController from "../../controllers/LoginController";
import UserModel from "../../models/UserModel";

jest.mock("../../models/UserModel");

describe("LoginController - restrição de login para usuários cadastrados", () => {
  const loginController = new LoginController();

  const mockJson = jest.fn();
  const mockStatus = jest.fn(() => ({ json: mockJson }));
  const res = { status: mockStatus } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar erro se o usuário não estiver cadastrado", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    const req = {
      body: {
        email: "naoexiste@email.com",
        password: "Senha123@",
      },
    } as Request;

    await loginController.login(req, res);

    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({
      success: false,
      error: "Credenciais incorretas",
    });
  });
});
