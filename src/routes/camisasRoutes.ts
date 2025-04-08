
import { Router } from "express";
import CamisaController from "../controllers/CamisaController";

const router = Router();


router.get("/camisas", CamisaController.getAll);

router.get("/camisas/:id", CamisaController.getById);

router.post("/camisas", CamisaController.create);

router.put("/camisas/:id", CamisaController.update);

router.delete("/camisas/:id", CamisaController.delete);

export default router;
