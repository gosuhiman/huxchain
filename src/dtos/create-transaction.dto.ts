export interface CreateTransactionRequestDto {
  sender: string;
  recipient: string;
  amount: number;
}

export interface CreateTransactionResponseDto {
  message: string;
}
