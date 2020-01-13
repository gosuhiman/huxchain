import * as env from "env-var";
import {Blockchain} from "./blockchain";
import {BlockchainController} from "./controllers/blockchain.controller";
import {FinalErrorHandler} from "./error-handlers/final.error-handler";
import {HttpErrorHandler} from "./error-handlers/http.error-handler";
import {RequestLogMiddleware} from "./middlewares/request-log.middleware";
import {Server} from "./server/server";

const PORT: number = env.get("PORT", "5000").asPortNumber();

console.log("huxchain is starting");

const blockchain: Blockchain = new Blockchain();
const server: Server = new Server(
  PORT,
  [
    new RequestLogMiddleware(),
  ],
  [
    new BlockchainController(blockchain),
  ],
  [
    new HttpErrorHandler(),
    new FinalErrorHandler(),
  ],
);

server.start();
