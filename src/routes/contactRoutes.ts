import { Router } from "express";
import ContactController from "../controllers/Contact.Controller";
import {
  validateContactCreation,
  validateContactId, 
} from "../middleware/contact.validator";

const router = Router();


router.get("contact/form", ContactController.getAll);

router.get("contact/form/:id", validateContactId, ContactController.getById);


router.post("/contact/form", validateContactCreation, ContactController.create);

export default router;
