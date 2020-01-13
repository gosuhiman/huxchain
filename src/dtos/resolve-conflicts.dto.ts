import {Block} from "../block";

export interface ResolveConflictsResponseDto {
  message: string;
  newChain?: Block[];
  chain?: Block[];
}
