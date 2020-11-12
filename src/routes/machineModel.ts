import Express from 'express';
import { MachineModelControllerInstance } from '../controllers';

const resource = '/machinemodel';
export const machineModelRouter = Express.Router();

const machineModelController = MachineModelControllerInstance;

machineModelRouter.get(`${resource}`, machineModelController.get.bind(machineModelController));
machineModelRouter.get(`${resource}/:id`, machineModelController.getOne.bind(machineModelController))
machineModelRouter.post(`${resource}`, machineModelController.save.bind(machineModelController));
machineModelRouter.put(`${resource}/:id`, machineModelController.update.bind(machineModelController));
machineModelRouter.delete(`${resource}/:id`, machineModelController.delete.bind(machineModelController));