import * as dotenv from "dotenv";
import express, { Router } from "express";
import { Database } from "./database/database.interface";
import { MongoDBInstance } from "./database/mongodb/mongodb";

// activating dotenv
dotenv.config();

class App {
  private app = express();
  constructor(
    private routes: Router[],
    private database: Database,
    private port?: string
  ) {}

  async start() {
    const port = this.port || 3000;

    try {
      await this.database.connect();

      this.app.listen(port, () => {
        console.log("Server running on port", port);
      });
    } catch (err) {
      console.log("Falha ao iniciar o app");
    }
  }
}

const contextDatabase = MongoDBInstance;
const app = new App([], contextDatabase);
app.start();
