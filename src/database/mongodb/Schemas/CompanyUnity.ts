import Mongoose from "mongoose";

const companyUnitySchema = new Mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String},
  company: {type: Mongoose.SchemaTypes.ObjectId, ref: 'Company'}
});

export const CompanyUnityModel = Mongoose.model('CompanyUnity', companyUnitySchema);