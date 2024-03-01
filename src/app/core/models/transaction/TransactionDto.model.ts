export interface TransactionDto {
  id?: string;
  senderId: string;
  senderBankId: string;
  senderAccountId: string;
  amount: number;
  receiverId: string;
  receiverBankId: string;
  receiverAccountId: string;
  receiverAccountName: string;
  status: TransactionStatus;
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED'
}
