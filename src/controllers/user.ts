import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { UserRepository } from "../repositories";
import { UserValidators } from "../schemaValidators";

export class UserController {
  constructor(
    private repository: UserRepository,
    private userValidators: any
  ) {}

  async save(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (!this.userValidators.addValidator(body)) {
      return res.status(400).send({
        message: `Invalid fields ${JSON.stringify(
          this.userValidators.addValidator.errors
        )}`,
      });
    }
    try {
      const user = new User(body.name);
      const savedUser = await this.repository.save(user);
      return res.send(savedUser);
    } catch (err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (!this.userValidators.updateValidator(body)) {
      return res.status(400).send({
        message: `Invalid fields ${JSON.stringify(
          this.userValidators.addValidator.errors
        )}`,
      });
    }
    try {
      const userId = req.params.id;
      const updatedUser = await this.repository.update(userId, body);

      if (!updatedUser) {
        return res.status(400).send({ message: "Resource not found" });
      }

      return res.send(updatedUser);
    } catch (err) {
      return next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const userDeleted = await this.repository.delete(userId);
      if (userDeleted) {
        return res.send({ message: "Resource deleted" });
      }
      return res.send({ message: "Resource not deleted" });
    } catch (err) {
      return next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.repository.get();
      return res.send(users);
    } catch (err) {
      return next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await this.repository.getOne({ _id: userId });

      if (!user) {
        return res.status(404).send();
      }

      return res.send(user);
    } catch (err) {
      return next(err);
    }
  }
}

const userRepository = new UserRepository();
export const UserControllerInstance = new UserController(
  userRepository,
  UserValidators
);
