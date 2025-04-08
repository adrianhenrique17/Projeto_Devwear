import { Router } from "express";
import LoginController from "../controllers/loginController";

const router = Router();
const loginController = new LoginController(); 

router.post("/login", loginController.login); 

export default router;
