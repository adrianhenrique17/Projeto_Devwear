import express from "express";
import { getAll, getCamisetasById } from "../controllers/camisetasControllers";

const router = express.Router();

router.get("/api/camisetas", getAll);
router.get("/api/camisetas/:id" , getCamisetasById)

export default router