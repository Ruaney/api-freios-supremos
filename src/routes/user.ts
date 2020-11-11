import Express from 'express';
import { UserControllerInstance } from '../controllers';

const resource = '/user';
export const userRouter = Express.Router();

const userController = UserControllerInstance;

userRouter.get(`${resource}`, userController.get.bind(userController));
userRouter.get(`${resource}/:id`, userController.getOne.bind(userController));
userRouter.post(`${resource}`, userController.save.bind(userController));