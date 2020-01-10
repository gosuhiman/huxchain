import {Request, Response} from "express";
import {Blockchain} from "../blockchain";
import {Controller} from "../server/Controller";

export class BlockchainController extends Controller {
  constructor(private blockchain: Blockchain) {
    super();
  }

  public initRoutes() {
    this.router.get("/", this.test.bind(this));
  }

  public test(req: Request, res: Response) {
    res.send("wololo");
  }
}
