import express from "express";

export abstract class Controller {
  public router: express.Router = express.Router();

  protected constructor() {
    this.initRoutes();
  }

  public abstract initRoutes(): void;
}
