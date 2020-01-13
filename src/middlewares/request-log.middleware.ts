import {NextFunction, Request, RequestHandler, Response} from "express";
import {Middleware} from "../server/middleware";

export class RequestLogMiddleware extends Middleware {
  public get(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      switch (req.method) {
        case "GET":
          console.log(req.method, req.url);
          break;
        case "POST":
          console.log(req.method, req.url, req.body);
          break;
        case "PATCH":
          console.log(req.method, req.url, req.body);
          break;
        case "PUT":
          console.log(req.method, req.url, req.body);
          break;
        default:
          console.log(req.method, req.url);
      }
      next();
    };
  }
}
