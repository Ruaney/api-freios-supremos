import { NextFunction, Request, Response } from "express";
import { Company } from "../models";
import { CompanyRepository } from "../repositories/companyRepository";

export class CompanyController {
  constructor(private repository: CompanyRepository) {}

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const company = new Company(body.name);
      const savedCompany = await this.repository.save(company);
      return res.send(savedCompany);
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
      const company = await this.repository.getOne({_id: companyId});

      if (!company) {
        return res.status(404).send();
      }

      return res.send(company);
    } catch(err) {
      return next(err);
    }
  }
}

const companyRepository = new CompanyRepository();
export const CompanyControllerInstance = new CompanyController(
  companyRepository
);
