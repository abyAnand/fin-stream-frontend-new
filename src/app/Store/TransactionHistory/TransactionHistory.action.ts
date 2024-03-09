import { createAction, props } from "@ngrx/store";
import { TransactionHistory } from "src/app/core/models/transaction/TransactionHistory.model";

export const getTransactionHistory =  createAction(
  '[TRANSACTION-HISTORY] GET BY ACCOUNT_ID',
  props<{accountId: string}>()
);

export const getTransactionHistorySuccess = createAction(
  '[TRANSACTION-HISTORY] GET SUCCESS',
  props<{transactionHistoryList: TransactionHistory[]}>()
);

export const getTransactionHistoryFail = createAction(
  '[TRANSACTION-HISTORY] GET FAILURE',
  props<{error: string}>()
);
