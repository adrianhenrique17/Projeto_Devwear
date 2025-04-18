import { Router } from "express";
import CamisaController from "../controllers/CamisaController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/camisas", authMiddleware, CamisaController.getAll);

router.get("/camisas/:id", authMiddleware, CamisaController.getById);

router.post("/camisas", authMiddleware, CamisaController.create);

router.put("/camisas/:id", authMiddleware, CamisaController.update);

router.delete("/camisas/:id", authMiddleware, CamisaController.delete);

export default router;
