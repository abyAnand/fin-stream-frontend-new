import { TransactionHistory } from "src/app/core/models/transaction/TransactionHistory.model";

export interface TransactionHistoryStateInterface
{
  isLoading: boolean;
  transactionHistoryList: TransactionHistory[];
  error: string | null;
}
