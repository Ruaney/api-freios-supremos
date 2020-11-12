import { NextFunction, Request, Response } from "express";
import { Machine } from "../models";
import { MachineRepository } from "../repositories";

export class MachineController {
  constructor(private repository: MachineRepository) {}

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const imageUrl = (req as any).file?.path;
      const machine = new Machine(
        body.name,
        imageUrl,
        body.description,
        body.model,
        body.responsable,
        body.status || "available"
      );
      const savedMachine = await this.repository.save(machine);
      return res.send(savedMachine);
    } catch (err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const machineId = req.params.id;
      const body = req.body;
      const updatedMachine = await this.repository.update(machineId, body);

      if (!updatedMachine) {
        return res.status(400).send({ message: "Resource not found" });
      }

      return res.send("updating ativo");
    } catch (err) {
      return next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const machineId = req.params.id;
      const machineDeleted = await this.repository.delete(machineId);
      if (machineDeleted) {
        return res.send({ message: "Resource deleted" });
      }
      return res.send({ message: "Resource not deleted" });
    } catch (err) {
      return next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const machines = await this.repository.get();
      return res.send(machines);
    } catch (err) {
      return next(err);
    }
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const machineId = req.params.id;
      const machine = await this.repository.getOne({ _id: machineId });
      if (!machine) {
        return res.status(404).send();
      }
      return res.send(machine);
    } catch (err) {
      return next(err);
    }
  }
}

const machineRepository = new MachineRepository();
export const MachineControllerInstance = new MachineController(
  machineRepository
);
