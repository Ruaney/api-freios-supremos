import { NextFunction, Request, Response} from 'express';
import { Machine } from '../models';
import { MachineRepository } from '../repositories';


export class MachineController {
  constructor(private repository: MachineRepository) {}

  async save(req: Request, res: Response, next: NextFunction) {
    try {

      return res.send('salvando ativo');
    } catch(err) {
      return next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const machines = await this.repository.get();
      return res.send(machines);
    } catch(err) {
      return next(err);
    }
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      return res.send('pegando um ativo');
    } catch(err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      return res.send('updating ativo');
    } catch(err) {
      return next(err);
    }
  }
}

const machineRepository = new MachineRepository();
export const MachineControllerInstance = new MachineController(machineRepository);