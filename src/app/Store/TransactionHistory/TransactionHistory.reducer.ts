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

  on(getTransactionHistorySuccess, (state, action) => {
    // Filter out existing transactions from the new data
    const newTransactions = action.transactionHistoryList.filter(newTransaction => (
      !state.transactionHistoryList.some(existingTransaction => (
        existingTransaction.id === newTransaction.id 
      ))
    ));
  
    // Spread the new transactions into the existing list
    return {
      ...state,
      isLoading: false,
      transactionHistoryList: [...state.transactionHistoryList, ...newTransactions]
    };
  }),

  on(getTransactionHistoryFail, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
);
