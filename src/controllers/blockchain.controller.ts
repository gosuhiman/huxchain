import {Request, Response} from "express";
import {Block} from "../block";
import {Blockchain} from "../blockchain";
import {CreateTransactionRequestDto, CreateTransactionResponseDto} from "../dtos/create-transaction.dto";
import {GetChainResponseDto} from "../dtos/get-chain.dto";
import {MineResponseDto} from "../dtos/mine.dto";
import {RegisterNodesRequestDto, RegisterNodesResponseDto} from "../dtos/register-nodes.dto";
import {Controller} from "../server/Controller";
import {ResolveConflictsResponseDto} from "../dtos/resolve-conflicts.dto";

export class BlockchainController extends Controller {
  constructor(private blockchain: Blockchain) {
    super();
  }

  public initRoutes() {
    this.router.get("/mine", this.mine.bind(this));
    this.router.get("/chain", this.getChain.bind(this));
    this.router.post("/transaction", this.createTransaction.bind(this));
    this.router.post("/node/register", this.registerNodes.bind(this));
    this.router.get("/node/resolve", this.resolveConflicts.bind(this));
  }

  public mine(req: Request, res: Response) {
    const block: Block = this.blockchain.mine();
    const response: MineResponseDto = {
      message: "New block forged",
      block,
    };
    res.send(response);
  }

  public getChain(req: Request, res: Response) {
    const response: GetChainResponseDto = {
      chain: this.blockchain.chain,
      length: this.blockchain.chain.length,
    };
    res.send(response);
  }

  public createTransaction(req: Request, res: Response) {
    // TODO add validation
    const dto: CreateTransactionRequestDto = req.body;
    const index: number = this.blockchain.newTransaction(dto);
    const response: CreateTransactionResponseDto = {
      message: `Transaction will be added to Block ${index}`,
    };
    res.status(201).send(response);
  }

  public registerNodes(req: Request, res: Response) {
    // TODO add validation
    const dto: RegisterNodesRequestDto = req.body;
    for (const node of dto.nodes) this.blockchain.registerNode(node);
    const response: RegisterNodesResponseDto = {
      message: "New nodes have been added",
      totalNodes: Array.from(this.blockchain.nodes),
    };
    res.status(201).send(response);
  }

  public async resolveConflicts(req: Request, res: Response) {
    const replaced = await this.blockchain.resolveConflicts();
    let response: ResolveConflictsResponseDto;
    if (replaced) {
      response = {
        message: "Our chain was replaced",
        newChain: this.blockchain.chain,
      };
    } else {
      response = {
        message: "Our chain is authoritative",
        chain: this.blockchain.chain,
      };
    }

    res.send(response);
  }
}
