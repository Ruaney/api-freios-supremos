import { NextFunction, Request, Response } from "express";
import { Machine } from "../models";
import { MachineRepository } from "../repositories";
import Path from "path";
import * as fs from "fs";
import { MachineValidators } from "../schemaValidators";

export class MachineController {
  constructor(
    private repository: MachineRepository,
    private machineValidators: any
  ) {}

  async save(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (!this.machineValidators.addValidator(body)) {
      return res.status(400).send({
        message: `Invalid fields ${JSON.stringify(
          this.machineValidators.addValidator.errors
        )}`,
      });
    }
    try {
      const image = (req as any).file?.filename;
      const machine = new Machine(
        body.name,
        image,
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
    const body = req.body;
    if (!this.machineValidators.updateValidator(body)) {
      return res.status(400).send({
        message: `Invalid fields ${JSON.stringify(
          this.machineValidators.updateValidator.errors
        )}`,
      });
    }
    try {
      const machineId = req.params.id;
      const updatedMachine = await this.repository.update(machineId, body);

      if (!updatedMachine) {
        return res.status(400).send({ message: "Resource not found" });
      }

      return res.send(updatedMachine);
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

  async getImage(req: Request, res: Response, next: NextFunction) {
    try {
      const machineId = req.params.id;
      const machine = await this.repository.getOne({ _id: machineId });

      if (!machine) {
        return res.status(404).send();
      }
      const imagePath = Path.resolve(
        __dirname,
        `../../uploads/${machine.image}`
      );
      if (fs.existsSync(imagePath)) {
        res.writeHead(200, { "Content-Type": "image/jpg" });
        fs.createReadStream(imagePath).pipe(res);
      } else {
        return res
          .status(404)
          .send({ message: "Image does not exist anymore" });
      }
    } catch (err) {
      return next(err);
    }
  }
}

const machineRepository = new MachineRepository();
export const MachineControllerInstance = new MachineController(
  machineRepository,
  MachineValidators
);
