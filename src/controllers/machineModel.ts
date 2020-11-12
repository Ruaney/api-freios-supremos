import { NextFunction, Request, Response } from "express";
import { MachineModel } from "../models";
import { MachineModelRepository } from "../repositories";

export class MachineModelController {
  constructor(private repository: MachineModelRepository) {}

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const machineModel = new MachineModel(body.name, body.description);
      const savedMachineModel = await this.repository.save(machineModel);
      return res.send(savedMachineModel);
    } catch (err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const machineModelId = req.params.id;
      const body = req.body;
      const updatedMachineModel = await this.repository.update(machineModelId, body);

      if (!updatedMachineModel) {
        return res.status(400).send({message: "Resource not found"});
      }

      return res.send(updatedMachineModel);
    } catch(err) {
      return next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const machineModelId = req.params.id;
      const machineModelDeleted = await this.repository.delete(machineModelId);
      if (machineModelDeleted) {
        return res.send({message: 'Resource deleted'});
      }
      return res.send({message: 'Resource not deleted'});
    } catch(err) {
      return next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const machineModels = await this.repository.get();
      return res.send(machineModels);
    } catch (err) {
      return next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const machineModelId = req.params.id;
      const machineModel = await this.repository.getOne({_id: machineModelId});

      if (!machineModel) {
        return res.status(404).send();
      }

      return res.send(machineModel);
    } catch(err) {
      return next(err);
    }
  }
}

const machineModelRepository = new MachineModelRepository();
export const MachineModelControllerInstance = new MachineModelController(
  machineModelRepository
);
