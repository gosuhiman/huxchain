import axios from "axios";
import crypto from "crypto";
import uuid from "uuid";

import {Block} from "./block";
import {Transaction} from "./transaction";
import {GetChainResponseDto} from "./dtos/get-chain.dto";

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

  public static validChain(chain: Block[]): boolean {
    if (chain.length === 0)  return false;

    let lastBlock: Block = chain[0];
    let currentIndex = 1;

    while (currentIndex < chain.length) {
      const block = chain[currentIndex];
      if (block.previousHash !== Blockchain.hash(lastBlock)) return false;
      if (!Blockchain.validProof(lastBlock.proof, block.proof)) return false;
      lastBlock = block;
      currentIndex++;
    }

    return true;
  }

  public static generateAddress(): string {
    return uuid.v4().replace("-", "");
  }

  public nodeAddress: string = Blockchain.generateAddress();
  public chain: Block[] = [];
  private currentTransactions: Transaction[] = [];
  private nodes: Set<string> = new Set();

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

  public registerNode(url: string) {
    const parsedUrl = new URL(url);
    this.nodes.add(parsedUrl.host);
  }

  // Consensus Algorithm - longest valid chain wins
  public async resolveConflicts() {
    const neighbours: Set<string> = this.nodes;
    let newChain: Block[] | undefined;
    let maxLength: number = this.chain.length;

    for (const node of neighbours) {
      const response = await axios.request<GetChainResponseDto>({url: `http://${node}/chain`});
      if (response.status !== 200) continue;
      const chain: Block[] = response.data.chain;
      const length: number = response.data.length;

      if (length > maxLength && Blockchain.validChain(chain)) {
        maxLength = length;
        newChain = chain;
      }
    }

    if (newChain) {
      this.chain = newChain;
      return true;
    }

    return false;
  }

  private lastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }
}
