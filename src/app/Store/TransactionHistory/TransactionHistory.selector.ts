import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../types/appState.interface";
import { TransactionHistory } from "src/app/core/models/transaction/TransactionHistory.model";

export const transactionHistorySelector = (state: AppStateInterface) => state.transactionHistoryList;

export const getTransactionHistorySelector = createSelector(
  transactionHistorySelector,
  (state) => state.transactionHistoryList
);


export const getTransactionHistoryLoadingSelector = createSelector(
  transactionHistorySelector,
  (state) => state.isLoading
);

export const getTransationHistoryErrorSelector = createSelector(
  transactionHistorySelector,
  (state) => state.error
);

export const getSingleAccountTransationHistorySelector = (accountId: string) =>
  createSelector(
    transactionHistorySelector,
    (state) => state.transactionHistoryList.find((transactionHistory) => transactionHistory.sender.userAccountId === accountId)
  );