// src/routes/camisa.routes.ts
import { Router } from "express";
import CamisaController from "../controllers/CamisaController";

const router = Router();

// GET /camisas - List all shirts
router.get("/", CamisaController.getAll);

// GET /camisas/:id - Get shirt by ID
router.get("/:id", CamisaController.getById);

// POST /camisas - Create new shirt
router.post("/", CamisaController.create);

// PUT /camisas/:id - Update shirt
router.put("/:id", CamisaController.update);

// DELETE /camisas/:id - Delete shirt
router.delete("/:id", CamisaController.delete);

export default router;
