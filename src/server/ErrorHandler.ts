import {ErrorRequestHandler} from "express";

export abstract class ErrorHandler {
  public abstract get(): ErrorRequestHandler;
}
