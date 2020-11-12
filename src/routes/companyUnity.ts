import Express from 'express';
import { CompanyUnityControllerInstance } from '../controllers';

const resource = '/companyunity';
export const companyUnityRouter = Express.Router();

const companyUnityController = CompanyUnityControllerInstance;

companyUnityRouter.get(`${resource}`, companyUnityController.get.bind(companyUnityController));
companyUnityRouter.get(`${resource}/:id`, companyUnityController.getOne.bind(companyUnityController));
companyUnityRouter.post(`${resource}`, companyUnityController.save.bind(companyUnityController));
companyUnityRouter.put(`${resource}/:id`, companyUnityController.update.bind(companyUnityController));
companyUnityRouter.delete(`${resource}/:id`, companyUnityController.delete.bind(companyUnityController));

// add machines to companyUnity
companyUnityRouter.post(`${resource}/:id/machines`, companyUnityController.addMachine.bind(companyUnityController))
companyUnityRouter.delete(`${resource}/:id/machines/:machineId`, companyUnityController.removeMachine.bind(companyUnityController));