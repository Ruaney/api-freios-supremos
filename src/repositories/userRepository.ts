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
      const documents = await this.model.find();
      const users: User[] = documents.map(
        (doc) => new User(doc._id, doc.get("name"))
      );
      return users;
    } catch (err) {
      throw new Error("Error trying to get User List " + err);
    }
  }

  async getOne(query): Promise<User> {
    try {
      const document = await this.model.findOne(query);
      if (document) {
        const user = new User(document.get("name"), document._id);
        return user;
      }
      return;
    } catch (err) {
      throw new Error("Error trying to get one element " + err);
    }
  }

  async save(user: User): Promise<User> {
    try {
      const newUser = new this.model({
        name: user.name,
      });
      await newUser.save();
      return this.getOne({_id: newUser._id});
    } catch (err) {
      throw new Error("Error trying to save new User " + err);
    }
  }

  async update(UserId: string, data: any): Promise<User> {
    try {
      const updatedUser = await this.model.findOneAndUpdate(
        { _id: UserId },
        { $set: data },
        { new: true, useFindAndModify: true }
      );
      if (updatedUser) {
        return this.getOne({_id: updatedUser._id});
      }
      return;
    } catch (err) {
      throw new Error("Error trying to update User " + err);
    }
  }

  async delete(userId: string): Promise<boolean> {
    try {
      const deletedUser = await this.model.deleteOne({_id: userId});
      if (deletedUser.deletedCount > 0) {
        return true;
      }
      return false;
    } catch(err) {
      throw new Error("Error trying to delete User " + err);
    }
  }
}