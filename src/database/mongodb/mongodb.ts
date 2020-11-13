import Mongoose from "mongoose";
import { Database } from "../database.interface";

class MongoDB implements Database {
  isConnected = false;
  constructor() {}

  async connect() {
    try {
      // retriving needed configurations
      const username = process.env.MONGO_ATLAS_USERNAME;
      const password = process.env.MONGO_ATLAS_PASSWORD;
      const dbUri = process.env.MONGO_ATLAS_DBURI;
      const dbName = process.env.MONGO_ATLAS_DBNAME;

      console.log('db username', username);
      console.log('db password', password);
      console.log('db uri', dbUri);
      console.log('db name', dbName);

      // connecting to mongo atlas
      await Mongoose.connect(
        `mongodb+srv://${username}:${password}${dbUri}/${dbName}`,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      console.log("Connected to MongoDB database.");
    } catch (error) {
      throw new Error("Failed connecting to Database.");
    }
  }
}

export const MongoDBInstance = new MongoDB();
