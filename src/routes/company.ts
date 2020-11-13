import Express from 'express';
import { CompanyControllerInstance } from '../controllers';

const resource = '/company';
export const companyRouter = Express.Router();

const companyController = CompanyControllerInstance;

companyRouter.get(`${resource}`, companyController.get.bind(companyController));
companyRouter.get(`${resource}/:id`, companyController.getOne.bind(companyController))
companyRouter.post(`${resource}`, companyController.save.bind(companyController));
companyRouter.put(`${resource}/:id`, companyController.update.bind(companyController));
companyRouter.delete(`${resource}/:id`, companyController.delete.bind(companyController));
