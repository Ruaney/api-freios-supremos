import Mongoose from "mongoose";
import { MachineMongooseModel } from "../database/mongodb/Schemas";
import { Machine, MachineModel, User } from "../models";
import { Repository } from "./repository.interface";

export class MachineRepository implements Repository {
  private model: Mongoose.Model<Mongoose.Document, {}>;

  constructor() {
    this.model = MachineMongooseModel;
  }

  async get(): Promise<Machine[]> {
    try {
      const documents = await this.model.find().populate("responsable model");
      const machines: Machine[] = documents.map(
        (doc) =>
          new Machine(
            doc.get("name"),
            doc.get("image"),
            doc.get("description"),
            new MachineModel(doc.get('model').name, doc.get('description'), doc.get('model')._id),
            new User(doc.get("responsable").name, doc._id),
            doc.get("status"),
            doc._id
          )
      );
      return machines;
    } catch (err) {
      throw new Error("Error trying to get Machine List " + err);
    }
  }

  async getOne(query): Promise<Machine> {
    try {
      const document = await await this.model
        .findOne(query)
        .populate("responsable model");
      if (document) {
        const company = new Machine(
          document.get("name"),
          document.get("image"),
          document.get("description"),
          new MachineModel(
            document.get("name"),
            document.get("description"),
            document._id
          ),
          new User(document.get("responsable").name, document._id),
          document.get("status"),
          document._id
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
        image: machine.image,
        description: machine.description,
        model: machine.model,
        responsable: machine.responsable,
        status: machine.status,
      });
      await newMachine.save();
      return this.getOne({ _id: newMachine._id });
    } catch (err) {
      throw new Error("Error trying to save new Machine " + err);
    }
  }

  async update(machineId: string, data: any): Promise<Machine> {
    try {
      const updatedMachine = await this.model
        .findOneAndUpdate(
          { _id: machineId },
          { $set: data },
          { new: true, useFindAndModify: true }
        )
        .populate("model responsable");
      if (updatedMachine) {
        return this.getOne({_id: updatedMachine._id});
      }
      return;
    } catch (err) {
      throw new Error("Error trying to update Machine " + err);
    }
    return;
  }

  async delete(machineId: string): Promise<boolean> {
    try {
      const deletedMachine = await this.model.deleteOne({ _id: machineId });
      if (deletedMachine.deletedCount > 0) {
        return true;
      }
      return false;
    } catch (err) {
      throw new Error("Error trying to delete Machine " + err);
    }
  }
}
