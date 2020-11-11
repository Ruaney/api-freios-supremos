import Mongoose from "mongoose";

const companySchema = new Mongoose.Schema({
  name: {type: String, required: true}
});

export const CompanyModel = Mongoose.model('Company', companySchema);