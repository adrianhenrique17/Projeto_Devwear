// src/controllers/camisa.controller.ts
import { Request, Response } from "express";
import Camisa from "../models/CamisaModel";

class CamisaController {
  // List all shirts
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const camisas = await Camisa.findAll();
      res.status(200).json(camisas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar camisas" });
    }
  }

  // Get shirt by ID
  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const camisa = await Camisa.findByPk(req.params.id);
      if (camisa) {
        res.status(200).json(camisa);
      } else {
        res.status(404).json({ error: "informação não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar camisa" });
    }
  }

  // Create new shirt
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const novaCamisa = await Camisa.create(req.body);
      res.status(201).json(novaCamisa);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar camisa" });
    }
  }

  // Update shirt
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const [updated] = await Camisa.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedCamisa = await Camisa.findByPk(req.params.id);
        res.status(200).json(updatedCamisa);
      } else {
        res.status(404).json({ error: "não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar camisa" });
    }
  }

  // Delete shirt
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await Camisa.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.status(204).json(deleted);
      } else {
        res.status(404).json({ error: "Camisa não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar camisa" });
    }
  }
}

export default new CamisaController();
