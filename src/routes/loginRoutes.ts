import { Router } from "express";
import LoginController from "../controllers/loginController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const loginController = new LoginController();

router.post("/login", loginController.login);

export default router;
