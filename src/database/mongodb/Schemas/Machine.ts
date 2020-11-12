import Mongoose from "mongoose";

const machineSchema = new Mongoose.Schema({
  name: {type: String, required: true},
  imageUrl: {type: String, required: true},
  description: {type: String, required: true},
  model: {type: Mongoose.SchemaTypes.ObjectId, ref: 'MachineModel'},
  responsable: {type: Mongoose.SchemaTypes.ObjectId, ref: 'User'},
  status: {type: String, default: 'available'},
});

export const MachineMongooseModel = Mongoose.model('Machine', machineSchema);