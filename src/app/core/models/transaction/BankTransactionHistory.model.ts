import { TransactionStatus } from "./TransactionDto.model";
import { UserInfo } from "./UserInfo.model";

export interface BankTransactionHistory {
  id: string;
  sender: UserInfo;
  senderBank: Bank;
  amount: number;
  receiver: UserInfo;
  receiverBank: Bank;
  status: TransactionStatus;
  self: boolean;
  day: number;
  month: string;
  year: number;
}

export interface Bank {
  id: string;
  name: string;
  shortName: string;
  verified: boolean;
  status: Status;
  address: string;
  email: string;
  phoneNumber: string;
}

// export enum TransactionStatus {
//   COMPLETED = 'COMPLETED',
//   FAILED = 'FAILED',
//   PENDING = 'PENDING',
// }

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  CLOSED = 'CLOSED',
  MAINTENANCE = 'MAINTENANCE',
}
