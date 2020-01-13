import {ValidationError} from "@hapi/joi";
import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import * as HttpStatus from "http-status-codes";
import {ErrorHandler} from "../server/ErrorHandler";

export class HttpErrorHandler extends ErrorHandler {
  public get(): ErrorRequestHandler {
    return (error: Error, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof (ValidationError as any)) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
          message: "Validation error",
          errors: (error as ValidationError).details,
        });
      }

      if (error instanceof SyntaxError) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: "Invalid request body",
        });
      }

      next(error);
    };
  }
}
