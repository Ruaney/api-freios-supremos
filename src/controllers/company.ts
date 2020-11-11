import { NextFunction, Request, Response } from "express";
import { Repository } from "../repositories";
import { CompanyRepository } from "../repositories/companyRepository";

class CompanyController {
  constructor(private repository: Repository) {}

  save(req: any, res: Response, next: NextFunction) {
    try {
      return res.send('salvando company');
    } catch (err) {
      return next(err);
    }
  }

  get(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      return next(err);
    }
    return res.send("Listando todas empresass");
  }
}

const companyRepository = new CompanyRepository();
export const CompanyControllerInstance = new CompanyController(
  companyRepository
);
