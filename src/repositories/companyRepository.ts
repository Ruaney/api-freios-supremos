import Mongoose from "mongoose";
import { CompanyMongooseModel } from "../database/mongodb/Schemas";
import { Company } from "../models";
import { Repository } from "./repository.interface";

export class CompanyRepository implements Repository {
  private model: Mongoose.Model<Mongoose.Document, {}>;

  constructor() {
    this.model = CompanyMongooseModel;
  }

  async get(): Promise<Company[]> {
    try {
      const documents = await this.model.find();
      const companies: Company[] = documents.map(
        (doc) => new Company(doc._id, doc.get("name"))
      );
      return companies;
    } catch (err) {
      throw new Error("Error trying to get Company List " + err);
    }
  }

  async getOne(query): Promise<Company> {
    try {
      const document = await this.model.findOne(query);
      if (document) {
        const company = new Company(document.get("name"), document._id);
        return company;
      }
      return;
    } catch (err) {
      throw new Error("Error trying to get one element " + err);
    }
  }

  async save(company: Company): Promise<Company> {
    try {
      const newCompany = new this.model({
        name: company.name,
      });
      await newCompany.save();
      return new Company(newCompany.get("name"), newCompany._id);
    } catch (err) {
      throw new Error("Error trying to save new Company " + err);
    }
  }

  async update(companyId: string, data: any): Promise<Company> {
    try {
      const updatedCompany = await this.model.findOneAndUpdate(
        { _id: companyId },
        { $set: data },
        { new: true, useFindAndModify: true }
      );
      if (updatedCompany) {
        const company = new Company(
          updatedCompany.get("name"),
          updatedCompany._id
        );
        return company;
      }
      return;
    } catch (err) {
      throw new Error("Error trying to update Company " + err);
    }
  }

  async delete(companyId: string): Promise<boolean> {
    try {
      const deletedCompany = await this.model.deleteOne({_id: companyId});
      if (deletedCompany.deletedCount > 0) {
        return true;
      }
      return false;
    } catch(err) {
      throw new Error("Error trying to delete Company " + err);
    }
  }
}
