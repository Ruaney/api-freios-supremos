import { NextFunction, Request, Response} from 'express';
import { CompanyUnity } from '../models';
import { CompanyUnityRepository } from '../repositories';


export class CompanyUnityController {
  constructor(private repository: CompanyUnityRepository) {}

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const companyUnity = new CompanyUnity(body.name, body.address, body.company);
      const savedCompanyUnity = await this.repository.save(companyUnity);
      return res.send(savedCompanyUnity);
    } catch(err) {
      return next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const unities = await this.repository.get();
      return res.send(unities);
    } catch(err) {
      return next(err);
    }
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const companyUnityId = req.params.id;
      const companyUnity = await this.repository.getOne({_id: companyUnityId});
      if (!companyUnity) {
        return res.status(404).send();
      }

      return res.send(companyUnity);
    } catch(err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      return res.send('updating unidade');
    } catch(err) {
      return next(err);
    }
  }
}

const companyUnityRepository = new CompanyUnityRepository();
export const CompanyUnityControllerInstance = new CompanyUnityController(companyUnityRepository);