import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../types/appState.interface";

export const accountSelector = (state: AppStateInterface) => state.transactionHistoryList;

export const getTransactionHistorySelector = createSelector(
  accountSelector,
  (state) => state.transactionHistoryList
);


export const getTransactionHistoryLoadingSelector = createSelector(
  accountSelector,
  (state) => state.isLoading
);

export const getTransationHistoryErrorSelector = createSelector(
  accountSelector,
  (state) => state.error
);
