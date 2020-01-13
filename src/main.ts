import {Blockchain} from "./blockchain";
import {BlockchainController} from "./controllers/blockchain.controller";
import {RequestLogMiddleware} from "./middlewares/request-log.middleware";
import {Server} from "./server/server";

console.log("huxchain is starting");

const blockchain: Blockchain = new Blockchain();
const server: Server = new Server([
  new RequestLogMiddleware(),
], [
  new BlockchainController(blockchain),
]);

server.start();
