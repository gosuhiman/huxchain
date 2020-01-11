import crypto from "crypto";
import uuid from "uuid";

import {Block} from "./block";
import {Transaction} from "./transaction";

export class Blockchain {
  public static hash(block: Block): string {
    return crypto.createHash("sha256").update(JSON.stringify(block)).digest("hex");
  }

  public static proofOfWork(lastProof: number): number {
    let proof: number = 0;
    while (!Blockchain.validProof(lastProof, proof)) proof++;
    return proof;
  }

  public static validProof(lastProof: number, proof: number): boolean {
    const guess: string = crypto.createHash("sha256").update(`${lastProof}${proof}`).digest("hex");
    return guess.substr(0, 4) === "0000";
  }

  public static generateAddress(): string {
    return uuid.v4().replace("-", "");
  }

  public nodeAddress: string = Blockchain.generateAddress();
  public chain: Block[] = [];
  private currentTransactions: Transaction[] = [];

  constructor() {
    this.newBlock(100, "1");
  }

  public newBlock(proof: number, previousHash?: string): Block {
    const block: Block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.currentTransactions,
      proof,
      previousHash: previousHash || Blockchain.hash(this.lastBlock()),
    };
    this.currentTransactions = [];
    this.chain.push(block);
    return block;
  }

  public newTransaction(transaction: Transaction): number {
    this.currentTransactions.push(transaction);
    return this.lastBlock().index + 1;
  }

  public mine(): Block {
    const proof: number = Blockchain.proofOfWork(this.lastBlock().proof);
    this.newTransaction({
      sender: "0",
      recipient: this.nodeAddress,
      amount: 1,
    });
    return this.newBlock(proof);
  }

  private lastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }
}
