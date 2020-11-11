import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
  name: {type: String},
});

export const UserModel = Mongoose.model('User', userSchema);