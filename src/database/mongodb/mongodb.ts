import Mongoose from 'mongoose';
import { Database } from '../database.interface';

class MongoDB implements Database {

  isConnected = false;
  constructor() {};

  async connect() {
    try {
      const username = process.env.MONGO_ATLAS_USERNAME;
      const password = process.env.MONGO_ATLAS_PASSWORD;
      const dbUri = process.env.MONGO_ATLAS_DBURI;
      const dbName = process.env.MONGO_ATLAS_DBNAME;

      await Mongoose.connect(`mongodb+srv://${username}:${password}${dbUri}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true } );
      console.log('Connected to MongoDB database.');
    } catch(error) {
      throw new Error('Failed connecting to Database.');
    }
  }
}


export const MongoDBInstance = new MongoDB();