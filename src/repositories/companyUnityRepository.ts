import Mongoose, { Model } from "mongoose";
import {
  CompanyMongooseModel,
  CompanyUnityMongooseModel,
} from "../database/mongodb/Schemas";
import { Company, CompanyUnity, Machine, MachineModel, User } from "../models";
import { Repository } from "./repository.interface";

export class CompanyUnityRepository implements Repository {
  private model: Mongoose.Model<Mongoose.Document, {}>;

  constructor() {
    this.model = CompanyUnityMongooseModel;
  }

  async get(): Promise<CompanyUnity[]> {
    try {
      const documents = await this.model.find({}).populate("company");
      const companyUnities: CompanyUnity[] = documents.map(
        (doc) =>
          new CompanyUnity(
            doc.get("name"),
            doc.get("address"),
            new Company(doc.get("company").name, doc.get("company")._id),
            doc.get("machines").map((machine) => this.createMachine(machine))
          )
      );
      return companyUnities;
    } catch (err) {
      throw new Error("Error trying to get CompanyUnity list " + err);
    }
  }

  async getOne(query): Promise<CompanyUnity> {
    try {
      const document = await this.model.findOne(query).populate("company");
      if (document) {
        const companyUnity = new CompanyUnity(
          document.get("name"),
          document.get("address"),
          new Company(document.get("company").name, document._id),
          document.get("machines").map((machine) => this.createMachine(machine)),
          document._id
        );
        return companyUnity;
      }
      return;
    } catch (err) {
      throw new Error("Error trying to get one CompanyUnity " + err);
    }
    return;
  }

  async save(companyUnity: CompanyUnity) {
    try {
      const newCompanyUnity = new this.model({
        name: companyUnity.name,
        address: companyUnity.address,
        company: companyUnity.company,
      }).populate("company");

      await newCompanyUnity.save();

      return this.getOne({ _id: newCompanyUnity._id });
    } catch (err) {
      throw new Error("Error trying to save new CompanyUnity " + err);
    }
  }

  async update(companyUnityId: string, data: any) {
    try {
      const updatedCompanyUnity = await this.model.findOneAndUpdate(
        { _id: companyUnityId },
        { $set: data },
        { new: true, useFindAndModify: true }
      );
      if (updatedCompanyUnity) {
        return this.getOne({_id: updatedCompanyUnity._id});
      }
      return;
    } catch (err) {
      throw new Error("Error trying to update CompanyUnity " + err);
    }
  }

  async delete(companyUnityId: string): Promise<boolean> {
    try {
      const deletedCompanyUnity = await this.model.deleteOne({
        _id: companyUnityId,
      });
      if (deletedCompanyUnity.deletedCount > 0) {
        return true;
      }
      return false;
    } catch (err) {
      throw new Error("Error trying to delete CompanyUnity" + err);
    }
  }

  private createMachine(doc: any): Machine {
    return new Machine(
      doc.name,
      doc.image,
      doc.description,
      new MachineModel(doc.model.name, doc.model.description, doc.model._id),
      new User(doc.resposnable.name, doc.responsable._id),
      doc.status
    );
  }
}
