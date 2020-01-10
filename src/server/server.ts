import bodyParser from "body-parser";
import express from "express";
import {Controller} from "./Controller";

const PORT: number = 80;

export class Server {
  private app: express.Application;

  constructor(controllers: Controller[] = []) {
    this.app = express();
    this.middlewares();
    this.routes(controllers);
  }

  public middlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}))
  }

  public routes(controllers: Controller[]) {
    for (const controller of controllers) {
      this.app.use("/", controller.router);
    }
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`App listening on the http://localhost:${PORT}`);
    });
  }
}
