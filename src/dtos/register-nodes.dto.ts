export interface RegisterNodesRequestDto {
  nodes: string[];
}

export interface RegisterNodesResponseDto {
  message: string;
  totalNodes: string[];
}
