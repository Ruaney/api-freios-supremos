import Mongoose from "mongoose";

const machineModelSchema = new Mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String}
});


export const MachineModelMongooseModel = Mongoose.model('MachineModel', machineModelSchema);