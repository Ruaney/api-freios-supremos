import Express from 'express';
import { CompanyControllerInstance } from '../controllers';

const resource = '/company';
export const companyRouter = Express.Router();

const companyController = CompanyControllerInstance;

companyRouter.get(`${resource}`, companyController.get);
companyRouter.post(`${resource}`, companyController.save);
