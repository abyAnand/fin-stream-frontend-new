import { createReducer, on } from "@ngrx/store";
import { TransactionHistoryStateInterface } from "../types/TransactionHistoryState.interface";
import { getTransactionHistory, getTransactionHistoryFail, getTransactionHistorySuccess } from "./TransactionHistory.action";

export const initialState: TransactionHistoryStateInterface = {
  isLoading : false,
  transactionHistoryList : [],
  error: null
};

export const transactionHistoryReducer = createReducer(
  initialState,

  on(getTransactionHistory, (state) => ({
    ...state,
    isLoading: true
  })),

  on(getTransactionHistorySuccess, (state, action) => ({
    ...state,
    isLoading: false,
    transactionHistoryList: [...state.transactionHistoryList, ...action.transactionHistoryList], // Concatenate the new transaction history with the existing list
  })),

  on(getTransactionHistoryFail, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
);
