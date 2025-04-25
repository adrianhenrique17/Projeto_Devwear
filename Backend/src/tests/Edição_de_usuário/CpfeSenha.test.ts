import { updateUser } from "../../controllers/UserController";
import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import { validateCPF } from "../../utils/validateCPF";

//usando para validar cpfs - https://validadordecpf.clevert.com.br/v-cpf.php#google_vignette

jest.mock("../../models/UserModel", () => {
  const actual = jest.requireActual("../../models/UserModel");
  return {
    __esModule: true,
    default: {
      findByPk: jest.fn(),
    },
    SENHA_REGEX: actual.SENHA_REGEX,
  };
});

const mockUserValid = {
  id: 1,
  name: "Usuário Válido",
  password: "Senha@123",
  cpf: "52998224725",
  save: jest.fn().mockResolvedValue(true),
};

const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe("updateUser (unitário) - Validações", () => {
  let res: Response;

  beforeEach(() => {
    res = mockResponse();
    jest.clearAllMocks();
  });

  describe("Validação de força da senha", () => {
    const senhasInvalidas = [
      "senha123",
      "SENHA123@",
      "Senha@",
      "12345678",
      "senha@forte",
    ];

    test.each(senhasInvalidas)(
      "Deve rejeitar senha inválida: %s",
      async (senha) => {
        const req = {
          params: { id: "1" },
          body: {
            name: "Nome Válido",
            password: senha,
            cpf: "52998224725",
          },
        } as Request<{ id: string }>;

        (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUserValid);

        await updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining({
            error: expect.stringMatching(/Senha inválida/),
          })
        );
      }
    );

    test("Deve aceitar senha forte válida", async () => {
      const req = {
        params: { id: "1" },
        body: {
          name: "Novo Nome",
          password: "NovaSenha@123",
          cpf: "52998224725",
        },
      } as Request<{ id: string }>;

      (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUserValid);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
        })
      );
    });
  });

  describe("Validação de CPF", () => {
    const cpfsInvalidos = [
      "00000000000",
      "123456",
      "52998224724",
      "111.222.333-44",
    ];

    test.each(cpfsInvalidos)("Deve rejeitar CPF inválido: %s", async (cpf) => {
      const req = {
        params: { id: "1" },
        body: {
          name: "Nome Válido",
          password: "Senha@123",
          cpf,
        },
      } as Request<{ id: string }>;

      (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUserValid);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: "CPF inválido",
        })
      );
    });

    test("Deve rejeitar CPF válido mas diferente do original", async () => {
      const req = {
        params: { id: "1" },
        body: {
          name: "Nome Válido",
          password: "Senha@123",
          cpf: "86328422708",
        },
      } as Request<{ id: string }>;

      (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUserValid);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: "CPF inválido",
        })
      );
    });
  });

  describe("Validação de CPF com função externa", () => {
    test.each([
      ["52998224725", true],
      ["08225031062", false],
      ["12345678909", true],
      ["00000000000", false],
      ["11111111111", false],
      ["5299822472", false],
      ["529982247256", false],
    ])("CPF %s deve retornar %s", (cpf, expected) => {
      expect(validateCPF(cpf)).toBe(expected);
    });
  });
});
