import express from "express";
import { getAll } from "../controllers/registroController";

const router = express.Router();

router.get("/registros", getAll);

export default router