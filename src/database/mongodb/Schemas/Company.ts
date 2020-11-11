import Mongoose from "mongoose";

const companySchema = new Mongoose.Schema({
  name: {type: String, required: true}
});


export const CompanyMongooseModel = Mongoose.model('Company', companySchema);
CompanyMongooseModel.name 