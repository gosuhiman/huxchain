import {Blockchain} from "./blockchain";
import {BlockchainController} from "./controllers/blockchain.controller";
import {Server} from "./server/server";

console.log("huxchain is starting");

const blockchain: Blockchain = new Blockchain();
const server: Server = new Server([
  new BlockchainController(blockchain),
]);

server.start();
