import { Router } from "express";
import ContactController from "../controllers/Contact.Controller";
import {
  validateContactCreation,
  validateContactId,
} from "../middleware/contact.validator";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("contact/form", authMiddleware, ContactController.getAll);

router.get(
  "contact/form/:id",
  validateContactId,
  authMiddleware,
  ContactController.getById
);

router.post(
  "/contact/form",
  validateContactCreation,
  authMiddleware,
  ContactController.create
);

export default router;
