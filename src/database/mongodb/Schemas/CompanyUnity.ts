import Mongoose from "mongoose";

const companyUnitySchema = new Mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String},
  company: {type: Mongoose.SchemaTypes.ObjectId, ref: 'Company'},
  machines: [{type: Mongoose.SchemaTypes.ObjectId, ref: 'Machine'}]
});

export const CompanyUnityMongooseModel = Mongoose.model('CompanyUnity', companyUnitySchema);