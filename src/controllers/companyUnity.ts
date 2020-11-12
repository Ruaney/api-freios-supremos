import { NextFunction, Request, Response } from "express";
import { CompanyUnity } from "../models";
import { CompanyUnityRepository } from "../repositories";

export class CompanyUnityController {
  constructor(private repository: CompanyUnityRepository) {}

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const companyUnity = new CompanyUnity(
        body.name,
        body.address,
        body.company
      );
      const savedCompanyUnity = await this.repository.save(companyUnity);
      return res.send(savedCompanyUnity);
    } catch (err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.params.id;
      const body = req.body;
      const updatedCompany = await this.repository.update(companyId, body);

      if (!updatedCompany) {
        return res.status(400).send({ message: "Resource not found" });
      }

      return res.send(updatedCompany);
    } catch (err) {
      return next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.params.id;
      const companyUnityDeleted = await this.repository.delete(companyId);
      if (companyUnityDeleted) {
        return res.send({ message: "Resource deleted" });
      }
      return res.send({ message: "Resource not deleted" });
    } catch (err) {
      return next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const unities = await this.repository.get();
      return res.send(unities);
    } catch (err) {
      return next(err);
    }
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const companyUnityId = req.params.id;
      const companyUnity = await this.repository.getOne({
        _id: companyUnityId,
      });
      if (!companyUnity) {
        return res.status(404).send();
      }

      return res.send(companyUnity);
    } catch (err) {
      return next(err);
    }
  }

  async addMachine(req: Request, res: Response, next: NextFunction) {
    try {
      const companyUnityId = req.params.id;
      const machineId = req.body.machineId;
      const updatedMachine = await this.repository.addMachine(
        companyUnityId,
        machineId
      );
      if (!updatedMachine) {
        return res.status(404).send();
      }
      return res.send(updatedMachine);
    } catch (err) {
      return next(err);
    }
  }
  async removeMachine(req: Request, res: Response, next: NextFunction) {
    try {
      const companyUnityId = req.params.id;
      const machineId = req.params.machineId;
      const updatedMachine = await this.repository.removeMachine(
        companyUnityId,
        machineId
      );
      if (!updatedMachine) {
        return res.status(404).send();
      }
      return res.send(updatedMachine);
    } catch (err) {
      return next(err);
    }
  }
}

const companyUnityRepository = new CompanyUnityRepository();
export const CompanyUnityControllerInstance = new CompanyUnityController(
  companyUnityRepository
);
