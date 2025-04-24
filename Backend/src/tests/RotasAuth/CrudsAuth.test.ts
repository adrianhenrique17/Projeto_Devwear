const mockHandler = jest.fn((req: any, res: any) => res.sendStatus(200));

jest.mock("../../controllers/CamisaController", () => ({
  getAll: mockHandler,
  getById: mockHandler,
  create: mockHandler,
  update: mockHandler,
  delete: mockHandler,
}));

jest.mock("../../controllers/ContactController", () => ({
  getAll: mockHandler,
  getById: mockHandler,
  create: mockHandler,
}));

jest.mock("../../controllers/UserController", () => ({
  getAll: mockHandler,
  getUserById: mockHandler,
  createUser: mockHandler,
  updateUser: mockHandler,
  destroyUserById: mockHandler,
}));

jest.mock("../../middleware/authMiddleware", () => ({
  authMiddleware: jest.fn((_req: any, _res: any, next: any) => next()),
}));

import express, { Request, Response, NextFunction } from "express";
import camisaRoutes from "../../routes/camisasRoutes";
import contactRoutes from "../../routes/contactRoutes";
import userRoutes from "../../routes/userRoutes";
import { authMiddleware } from "../../middleware/authMiddleware";

const mockReq = (method = "GET", url = "/"): Request =>
  ({ method, url } as unknown as Request);

const mockRes = (): Response => {
  const res = {} as Response;
  res.sendStatus = jest.fn();
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};

const mockNext = jest.fn();

const matchPath = (routePath: string, testPath: string): boolean => {
  const routeParts = routePath.split("/").filter(Boolean);
  const testParts = testPath.split("/").filter(Boolean);

  if (routeParts.length !== testParts.length) return false;

  return routeParts.every(
    (part, i) => part.startsWith(":") || part === testParts[i]
  );
};

const testAuthMiddleware = async (
  router: express.Router,
  path: string,
  method: string,
  skipAuth = false
) => {
  const req = mockReq(method.toUpperCase(), path);
  const res = mockRes();

  const routeHandler = (router.stack as any[]).find(
    (r) =>
      r.route?.path &&
      matchPath(r.route.path, path) &&
      r.route?.methods?.[method]
  );

  if (routeHandler?.route) {
    for (const layer of routeHandler.route.stack) {
      await layer.handle(req, res, mockNext);
    }

    if (skipAuth) {
      expect(authMiddleware).not.toHaveBeenCalled();
    } else {
      expect(authMiddleware).toHaveBeenCalled();
    }
  } else {
    throw new Error(`Rota ${method.toUpperCase()} ${path} não encontrada`);
  }
};

describe("Autenticação de Rotas", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rotas de Camisa", () => {
    const router = camisaRoutes;

    it("GET /camisas deve chamar o authMiddleware", async () => {
      await testAuthMiddleware(router, "/camisas", "get");
    });

    it("POST /camisas deve chamar o authMiddleware", async () => {
      await testAuthMiddleware(router, "/camisas", "post");
    });
  });

  describe("Rotas de Contato", () => {
    const router = contactRoutes;

    it("GET /contact/form deve chamar o authMiddleware", async () => {
      await testAuthMiddleware(router, "/contact/form", "get");
    });

    it("POST /contact/form deve chamar o authMiddleware", async () => {
      await testAuthMiddleware(router, "/contact/form", "post");
    });
  });

  describe("Rotas de Usuário", () => {
    const router = userRoutes;

    it("POST /users NÃO deve chamar o authMiddleware", async () => {
      await testAuthMiddleware(router, "/users", "post", true);
    });

    it("GET /users deve chamar o authMiddleware", async () => {
      await testAuthMiddleware(router, "/users", "get");
    });

    it("DELETE /users/1 deve chamar o authMiddleware", async () => {
      await testAuthMiddleware(router, "/users/1", "delete");
    });
  });

  describe("Simulação de erro 401 e 403", () => {
    it("Simula retorno 401", () => {
      const req = mockReq("GET", "/camisas");
      const res = mockRes();

      (authMiddleware as jest.Mock).mockImplementationOnce((_req, res) =>
        res.status(401).json({ error: "Token não fornecido" })
      );

      authMiddleware(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Token não fornecido" });
    });

    it("Simula retorno 403", () => {
      const req = mockReq("GET", "/users");
      const res = mockRes();

      (authMiddleware as jest.Mock).mockImplementationOnce((_req, res) =>
        res.status(403).json({ error: "Token inválido" })
      );

      authMiddleware(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" });
    });
  });
});
