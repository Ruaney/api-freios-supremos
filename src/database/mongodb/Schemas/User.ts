import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
  name: {type: String},
});

export const UserMongooseModel = Mongoose.model('User', userSchema);