import { Request, Response } from "express";
import Contact from "../models/ContactModel";

class ContactController {
  // Criar um novo contato
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, message } = req.body; // Usar "message" para alinhar com o banco de dados

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      const newContact = await Contact.create({ name, email, message });
      return res.status(201).json(newContact);
    } catch (error) {
      console.error("Erro ao criar contato:", error);
      return res.status(500).json({ error: "Erro ao criar contato" });
    }
  }

  // Método para Listar todos os contatos
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const contacts = await Contact.findAll();
      return res.json(contacts);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
      return res.status(500).json({ error: "Erro ao buscar contatos" });
    }
  }

  // Método Obter contato por ID
  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contact = await Contact.findByPk(id);

      if (!contact) {
        return res.status(404).json({ error: "Contato não encontrado" });
      }

      return res.json(contact);
    } catch (error) {
      console.error("Erro ao buscar contato:", error);
      return res.status(500).json({ error: "Erro ao buscar contato" });
    }
  }
}

export default new ContactController();
