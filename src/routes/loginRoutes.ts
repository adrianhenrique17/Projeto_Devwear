import { Router } from "express";
import LoginController from "../controllers/loginController";

const router = Router();
const loginController = new LoginController(); // Criando instância

router.post("/login", loginController.login); // Acessando o método login da instância

export default router;
