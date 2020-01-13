import bodyParser from "body-parser";
import express from "express";
import {Controller} from "./controller";
import {ErrorHandler} from "./error-handler";
import {Middleware} from "./middleware";

const PORT: number = 80;

export class Server {
  private app: express.Application;

  constructor(
    middlewares: Middleware[] = [],
    controllers: Controller[] = [],
    errorHandlers: ErrorHandler[] = [],
  ) {
    this.app = express();
    this.middlewares(middlewares);
    this.routes(controllers);
    this.errorHandlers(errorHandlers);
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

  public errorHandlers(errorHandlers: ErrorHandler[]) {
    for (const errorHandler of errorHandlers) {
      this.app.use(errorHandler.get());
    }
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`App listening on the http://localhost:${PORT}`);
    });
  }
}
