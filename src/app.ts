import * as dotenv from "dotenv";
import express, { Router } from "express";
import { Database } from "./database/database.interface";
import { MongoDBInstance } from "./database/mongodb/mongodb";
import * as Routes from "./routes";

// activating dotenv
dotenv.config();

class App {
  private app = express();
  constructor(private database: Database, private port?: string) {
    this.configureBodyParser();
  }

  private configureBodyParser() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

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

  addRouter(router: Router) {
    this.app.use(router);
  }
}

const contextDatabase = MongoDBInstance;
const app = new App(contextDatabase);

// setting routes
app.addRouter(Routes.companyRouter);

// starting server
app.start();
