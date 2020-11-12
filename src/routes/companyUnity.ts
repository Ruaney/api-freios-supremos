import Express from 'express';
import { CompanyUnityControllerInstance } from '../controllers';

const resource = '/companyunity';
export const companyUnityRouter = Express.Router();

const companyUnityController = CompanyUnityControllerInstance;

companyUnityRouter.get(`${resource}`, companyUnityController.get.bind(companyUnityController));
companyUnityRouter.get(`${resource}/:id`, companyUnityController.getOne.bind(companyUnityController));
companyUnityRouter.post(`${resource}`, companyUnityController.save.bind(companyUnityController));
companyUnityRouter.put(`${resource}/:id`, companyUnityController.update.bind(companyUnityController));