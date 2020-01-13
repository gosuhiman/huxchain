import {RequestHandler} from "express";

export abstract class Middleware {
  public abstract get(): RequestHandler;
}
