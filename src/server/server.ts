import bodyParser from "body-parser";
import express from "express";
import {Controller} from "./Controller";
import {Middleware} from "./Middleware";

const PORT: number = 80;

export class Server {
  private app: express.Application;

  constructor(middlewares: Middleware[] = [], controllers: Controller[] = []) {
    this.app = express();
    this.middlewares(middlewares);
    this.routes(controllers);
  }

  public middlewares(middlewares: Middleware[]) {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));

    for (const middleware of middlewares) {
      this.app.use(middleware.get());
    }
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
