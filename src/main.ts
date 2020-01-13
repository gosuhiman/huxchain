import {Blockchain} from "./blockchain";
import {BlockchainController} from "./controllers/blockchain.controller";
import {FinalErrorHandler} from "./error-handlers/final.error-handler";
import {HttpErrorHandler} from "./error-handlers/http.error-handler";
import {RequestLogMiddleware} from "./middlewares/request-log.middleware";
import {Server} from "./server/server";

console.log("huxchain is starting");

const blockchain: Blockchain = new Blockchain();
const server: Server = new Server([
  new RequestLogMiddleware(),
], [
  new BlockchainController(blockchain),
], [
  new HttpErrorHandler(),
  new FinalErrorHandler(),
]);

server.start();
