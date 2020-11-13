import { NextFunction, Request, Response } from "express";
import { Company } from "../models";
import { CompanyRepository } from "../repositories";
import Ajv from "ajv";
import { CompanyValidators } from "../schemaValidators/company.validator";
const ajv = Ajv();

export class CompanyController {
  constructor(
    private repository: CompanyRepository,
    private companyValidators: any
  ) {}

  async save(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (!this.companyValidators.addValidator(body)) {
      return res
        .status(400)
        .send({
          message: `Invalid fields ${JSON.stringify(
            this.companyValidators.addValidator.errors
          )}`,
        });
    }

    try {
      const company = new Company(body.name);
      const savedCompany = await this.repository.save(company);
      return res.send(savedCompany);
    } catch (err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (!this.companyValidators.updateValidator(body)) {
      return res
        .status(400)
        .send({
          message: `Invalid fields ${JSON.stringify(
            this.companyValidators.updateValidator.errors
          )}`,
        });
    }
    try {
      const companyId = req.params.id;
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
      const companyDeleted = await this.repository.delete(companyId);
      if (companyDeleted) {
        return res.send({ message: "Resource deleted" });
      }
      return res.send({ message: "Resource not deleted" });
    } catch (err) {
      return next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await this.repository.get();
      return res.send(companies);
    } catch (err) {
      return next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = req.params.id;
      const company = await this.repository.getOne({ _id: companyId });

      if (!company) {
        return res.status(404).send();
      }

      return res.send(company);
    } catch (err) {
      return next(err);
    }
  }
}

const companyRepository = new CompanyRepository();
export const CompanyControllerInstance = new CompanyController(
  companyRepository,
  CompanyValidators
);
