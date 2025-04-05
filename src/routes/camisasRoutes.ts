// src/routes/camisa.routes.ts
import { Router } from "express";
import CamisaController from "../controllers/CamisaController";

const router = Router();

// GET /camisas - List all shirts
router.get("/camisas", CamisaController.getAll);

// GET /camisas/:id - Get shirt by ID
router.get("/camisas/:id", CamisaController.getById);

// POST /camisas - Create new shirt
router.post("/camisas", CamisaController.create);

// PUT /camisas/:id - Update shirt
router.put("/camisas/:id", CamisaController.update);

// DELETE /camisas/:id - Delete shirt
router.delete("/camisas/:id", CamisaController.delete);

export default router;
