import Express from 'express';
import { upload } from '../config';
import { MachineControllerInstance } from '../controllers'

const resource = '/machine';
export const machineRouter = Express.Router();

const machineController = MachineControllerInstance;

machineRouter.get(`${resource}`, machineController.get.bind(machineController));
machineRouter.get(`${resource}/:id`, machineController.getOne.bind(machineController));
machineRouter.post(`${resource}`, upload.single('image'), machineController.save.bind(machineController));
machineRouter.put(`${resource}/:id`, machineController.update.bind(machineController));
machineRouter.delete(`${resource}/:id`, machineController.delete.bind(machineController));