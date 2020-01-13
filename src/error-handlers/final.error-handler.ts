import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {ErrorHandler} from "../server/error-handler";

export class FinalErrorHandler extends ErrorHandler {
  public get(): ErrorRequestHandler {
    return (error: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(error);
      res.status(500).send("Internal server error");
    };
  }
}
