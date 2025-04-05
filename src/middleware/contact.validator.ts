// src/middlewares/contact.validator.ts
import { body, param, ValidationChain } from "express-validator";

export const validateContactCreation: ValidationChain[] = [
  body("nome")
    .trim()
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nome deve ter entre 3 e 100 caracteres"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail é obrigatório")
    .isEmail()
    .withMessage("E-mail inválido")
    .isLength({ max: 100 })
    .withMessage("E-mail muito longo"),

  body("mensagem")
    .trim()
    .notEmpty()
    .withMessage("Mensagem é obrigatória")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Mensagem deve ter entre 10 e 2000 caracteres"),
];

export const validateContactUpdate = [
  param("id").isInt({ min: 1 }).withMessage("ID inválido"),
  ...validateContactCreation.map((validation) => validation.optional()),
];

export const validateContactId = [
  param("id").isInt({ min: 1 }).withMessage("ID inválido"),
];
