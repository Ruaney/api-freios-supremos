import Mongoose from "mongoose";
import {
  CompanyMongooseModel,
  CompanyUnityMongooseModel,
} from "../database/mongodb/Schemas";
import { Company, CompanyUnity } from "../models";
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
            new Company(doc.get("company").name, doc.get("company")._id)
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
          new Company(document.get("company").name, document._id)
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

      return new CompanyUnity(
        newCompanyUnity.get("name"),
        newCompanyUnity.get("address"),
        new Company(
          newCompanyUnity.get("company").name,
          newCompanyUnity.get("company")._id
        ),
        newCompanyUnity._id
      );
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
        const companyUnity = new CompanyUnity(
          updatedCompanyUnity.get("name"),
          updatedCompanyUnity.get("address"),
          new Company(
            updatedCompanyUnity.get("company").name,
            updatedCompanyUnity.get("company")._id
          ),
          updatedCompanyUnity._id
        );
        return companyUnity;
      }
      return;
    } catch (err) {
      throw new Error("Error trying to update CompanyUnity " + err);
    }
  }
}
