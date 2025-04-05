import { Router } from "express";
import ContactController from "../controllers/Contact.Controller";
import {
  validateContactCreation,
  validateContactId, // Adicione esta validação para rotas com :id
} from "../middleware/contact.validator";

const router = Router();

// GET - Listar todos (não precisa de validação de criação)
router.get("contact/form", ContactController.getAll);

// GET - Obter por ID (usa validação de ID apenas)
router.get("contact/form/:id", validateContactId, ContactController.getById);

// POST - Criar novo (usa validação de criação)
router.post("/contact/form", validateContactCreation, ContactController.create);

export default router;
