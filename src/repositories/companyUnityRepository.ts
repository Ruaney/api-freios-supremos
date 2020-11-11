import Mongoose from 'mongoose';
import { CompanyMongooseModel, CompanyUnityMongooseModel } from '../database/mongodb/Schemas';
import { Company, CompanyUnity } from '../models';
import { Repository } from './repository.interface';


export class CompanyUnityRepository implements Repository {
  private model: Mongoose.Model<Mongoose.Document, {}>;

  constructor() {
    this.model = CompanyMongooseModel;
  }

  async get(): Promise<CompanyUnity[]> {
    try {
      const documents = await this.model.find({}).populate('company');
      const companyUnities: CompanyUnity[] = documents.map(
        (doc) => new CompanyUnity(doc.get('name'), doc.get('address'), new Company(doc.get('company').name, doc.get('company')._id))
      );
      return companyUnities;
    } catch(err) {
      throw new Error('Error trying to get CompanyUnity list ' + err);
    }
  }
  
  async getOne(): Promise<CompanyUnity> {
    return;
  }

  async save(data: CompanyUnity) {
    return;
  }

  async update(data: CompanyUnity) {
    return;
  }
}