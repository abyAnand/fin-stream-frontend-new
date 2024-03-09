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

  // get all accountSettings

  on(getTransactionHistory,(state)=>({
    ...state,
    isLoading: true
  })),


  on(getTransactionHistorySuccess, (state, action)=>({
    ...state,
    isLoading: false,
    transactionHistoryList: [...action.transactionHistoryList],

  })),

  on(getTransactionHistoryFail, (state, action)=>({
    ...state,
    isLoading : false,
    error: action.error
  })),

)
