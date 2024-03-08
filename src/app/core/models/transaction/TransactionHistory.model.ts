import { UserInfo } from "./UserInfo.model";

export interface TransactionHistory {
  sender: UserInfo;
  amount: number;
  receiver: UserInfo;
  status: TransactionStatus;
  self: boolean;
  day?: number;
  month?: string;
  year?: number;
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  FAILED = "FAILED"
}
