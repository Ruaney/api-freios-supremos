import { NextFunction, Request, Response} from 'express';
import { User } from '../models';
import { UserRepository } from '../repositories';


export class UserController {
  constructor(private repository: UserRepository) {}

  async save(req: Request, res: Response, next: NextFunction) {
    try {

      return res.send('salvando User');
    } catch(err) {
      return next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.repository.get();
      return res.send(users);
    } catch(err) {
      return next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      return res.send('pegando um user');
    } catch(err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      return res.send('updating user');
    } catch(err) {
      return next(err);
    }
  }
}

const userRepository = new UserRepository();
export const UserControllerInstance = new UserController(userRepository);