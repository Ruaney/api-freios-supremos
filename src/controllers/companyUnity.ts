import { NextFunction, Request, Response} from 'express';
import { CompanyUnity } from '../models';
import { CompanyUnityRepository } from '../repositories';


export class CompanyUnityController {
  constructor(private repository: CompanyUnityRepository) {}

  async save(req: Request, res: Response, next: NextFunction) {
    try {

      return res.send('salvando unidade da compania');
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
      return res.send('pegando uma unidade');
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