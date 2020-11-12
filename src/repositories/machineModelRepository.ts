import Mongoose from "mongoose";
import { MachineModelMongooseModel } from "../database/mongodb/Schemas";
import { MachineModel } from "../models";
import { Repository } from "./repository.interface";

export class MachineModelRepository implements Repository {
  private model: Mongoose.Model<Mongoose.Document, {}>;

  constructor() {
    this.model = MachineModelMongooseModel;
  }

  async get(): Promise<MachineModel[]> {
    try {
      const documents = await this.model.find();
      const machineModels: MachineModel[] = documents.map(
        (doc) =>
          new MachineModel(doc.get("name"), doc.get("description"), doc._id)
      );
      return machineModels;
    } catch (err) {
      throw new Error("Error trying to get MachineModel List " + err);
    }
  }

  async getOne(query): Promise<MachineModel> {
    try {
      const document = await this.model.findOne(query);
      if (document) {
        const machineModel = new MachineModel(
          document.get("name"),
          document.get("description"),
          document._id
        );
        return machineModel;
      }
      return;
    } catch (err) {
      throw new Error("Error trying to get one element " + err);
    }
  }

  async save(machineModel: MachineModel): Promise<MachineModel> {
    try {
      const newMachineModel = new this.model({
        name: machineModel.name,
        description: machineModel.description,
      });
      await newMachineModel.save();
      return new MachineModel(
        newMachineModel.get("name"),
        newMachineModel.get("description"),
        newMachineModel._id
      );
    } catch (err) {
      throw new Error("Error trying to save new new MachineModel " + err);
    }
  }

  async update(machineModelId: string, data: any): Promise<MachineModel> {
    try {
      const updatedMachineModel = await this.model.findOneAndUpdate(
        { _id: machineModelId },
        { $set: data },
        { new: true, useFindAndModify: true }
      );
      if (updatedMachineModel) {
        const machineModel = new MachineModel(
          updatedMachineModel.get("name"),
          updatedMachineModel.get('description'),
          updatedMachineModel._id
        );
        return machineModel;
      }
      return;
    } catch (err) {
      throw new Error("Error trying to update MachineModel " + err);
    }
  }

  async delete(machineModelId: string): Promise<boolean> {
    try {
      const deletedMachineModel = await this.model.deleteOne({ _id: machineModelId });
      if (deletedMachineModel.deletedCount > 0) {
        return true;
      }
      return false;
    } catch (err) {
      throw new Error("Error trying to delete MachineModel " + err);
    }
  }
}
