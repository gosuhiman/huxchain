import crypto from "crypto";
const hash = crypto.createHash("sha256");

import {Block} from "./block";
import {Transaction} from "./transaction";

export class Blockchain {
  public static hash(block: Block): string {
    return "";
  }

  public static proofOfWork(lastProof: number): number {
    let proof: number = 0;
    while (!Blockchain.validProof(lastProof, proof)) proof++;
    return proof;
  }

  public static validProof(lastProof: number, proof: number): boolean {
    const guess: string = hash.update(`${lastProof}${proof}`).digest("hex");
    return guess.substr(0, 4) === "0000";
  }

  private chain: Block[] = [];
  private currentTransactions: Transaction[] = [];

  constructor() {
    this.newBlock(100, "1");
  }

  private newBlock(proof: number, previousHash?: string): Block {
    const block: Block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.currentTransactions,
      proof,
      previousHash: previousHash || Blockchain.hash(this.lastBlock()),
    };
    this.chain.push(block);
    return block;
  }

  private newTransaction(transaction: Transaction): number {
    this.currentTransactions.push(transaction);
    return this.lastBlock().index + 1;
  }

  private lastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }
}
