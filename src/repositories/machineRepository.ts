import Mongoose from "mongoose";
import { MachineMongooseModel } from "../database/mongodb/Schemas";
import { Machine, User } from "../models";
import { Repository } from "./repository.interface";

export class MachineRepository implements Repository {
  private model: Mongoose.Model<Mongoose.Document, {}>;

  constructor() {
    this.model = MachineMongooseModel;
  }

  async get(): Promise<Machine[]> {
    try {
      const documents = await this.model.find().populate("user");
      const machines: Machine[] = documents.map(
        (doc) =>
          new Machine(
            doc.get("name"),
            doc.get("imageUrl"),
            doc.get("description"),
            doc.get("model"),
            new User(doc.get("user").name),
            doc.get("status")
          )
      );
      return machines;
    } catch (err) {
      throw new Error("Error trying to get Machine List " + err);
    }
  }

  async getOne(query): Promise<Machine> {
    try {
      const document = await (await this.model.findOne(query)).populate("user");
      if (document) {
        const company = new Machine(
          document.get("name"),
          document.get("imageUrl"),
          document.get("description"),
          document.get("model"),
          new User(document.get("user").name),
          document.get("status")
        );
        return company;
      }
      return;
    } catch (err) {
      throw new Error("Error trying to get one element " + err);
    }
  }

  async save(machine: Machine): Promise<Machine> {
    try {
      const newMachine = new this.model({
        name: machine.name,
        imageUrl: machine.imageUrl,
        description: machine.description,
        model: machine.model,
        responsable: machine.responsable,
        status: machine.status,
      });
      await newMachine.save();
      return new Machine(
        newMachine.get("name"),
        newMachine.get("imageUrl"),
        newMachine.get("description"),
        newMachine.get("model"),
        new User(newMachine.get("user").name),
        newMachine.get("status")
      );
    } catch (err) {
      throw new Error("Error trying to save new Machine" + err);
    }
  }

  async update(companyUnityId: string, data: any) {
    return;
  }

  async delete(machineId: string): Promise<Machine> {
    try {
      return;
    } catch (err) {
      throw new Error("Error trying to delete Machine " + err);
    }
  }
}
