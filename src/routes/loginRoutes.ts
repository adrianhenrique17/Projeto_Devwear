import express from "express";
import { Router } from "express";
import loginController from "../controllers/loginController";
import { body } from "express-validator";

const router = Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("E-mail inválido").normalizeEmail(),
    body("password").notEmpty().withMessage("Senha é obrigatória"),
  ],
  loginController.login
);

export default router;
