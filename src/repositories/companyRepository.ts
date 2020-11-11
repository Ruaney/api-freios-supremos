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

  getOne(query): Company {
    return null;
  }

  async save(company: Company) {
    try {
      const newCompany = new this.model({
        name: company.name
      });
      await newCompany.save();
    } catch(err) {
      throw new Error("Error trying to save new Company " + err);
    }
  }

  update(company: Company) {}
}
