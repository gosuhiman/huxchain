import {Block} from "../block";

export interface GetChainResponseDto {
  chain: Block[];
  length: number;
}
