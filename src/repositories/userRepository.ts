import Mongoose from "mongoose";
import { UserMongooseModel } from "../database/mongodb/Schemas";
import { User } from "../models";
import { Repository } from "./repository.interface";

export class UserRepository implements Repository {
  private model: Mongoose.Model<Mongoose.Document, {}>;

  constructor() {
    this.model = UserMongooseModel;
  }

  async get(): Promise<User[]> {
    try {
      const documents = await this.model.find().populate("user");
      const users: User[] = documents.map(
        (doc) =>
          new User(
            doc.get("name"),
          )
      );
      return users;
    } catch (err) {
      throw new Error("Error trying to get Users List " + err);
    }
  }

  async getOne(query): Promise<User> {
    try {
      const document = await (await this.model.findOne(query));
      if (document) {
        const user = new User(
          document.get("name")
        );
        return user;
      }
      return;
    } catch (err) {
      throw new Error("Error trying to get one user" + err);
    }
  }

  async save(user: User): Promise<User> {
    try {
      const newUser = new this.model({
        name: user.name,
      });
      await newUser.save();
      return new User(
        newUser.get("name"),
      );
    } catch (err) {
      throw new Error("Error trying to save new User" + err);
    }
  }

  update(company: User) {}
}