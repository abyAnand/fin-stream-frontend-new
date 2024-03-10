import { createReducer, on } from "@ngrx/store";
import { BankStateInterface } from "../types/BankState.interface";
import { getAllBanksAction, getAllBanksActionFail, getAllBanksActionSuccess } from "./Bank.action";

export const initialState: BankStateInterface = {
  isLoading: false,
  bankList: [],
  error: null
};

export const bankReducer = createReducer(
  initialState,

  // get all users
  on(getAllBanksAction, (state) =>({
    ...state,
    isLoading: true
  })),
  on(getAllBanksActionSuccess, (state, action) =>({
    ...state,
    isLoading: false,
    bankList: [...action.bankList]
  })),
  on(getAllBanksActionFail, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  })),

  )
