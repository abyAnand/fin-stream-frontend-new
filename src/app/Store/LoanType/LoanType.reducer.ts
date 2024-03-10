import { createReducer, on } from "@ngrx/store";
import { LoanTypeStateInterface } from "../types/LoanTypeState.interface";
import { getAllLoanTypesAction, getAllLoanTypesActionFail, getAllLoanTypesActionSuccess } from "./LoanType.action";

export const initialState: LoanTypeStateInterface = {
  isLoading : false,
  loanTypeList : [],
  error: null
};

export const loanTypeReducer = createReducer(
  initialState,

  // get all loan types

  on(getAllLoanTypesAction,(state)=>({
    ...state,
    isLoading: true
  })),

  on(getAllLoanTypesActionSuccess, (state, action)=>({
    ...state,
    isLoading: false,
    loanTypeList: [...action.loanTypeList],

  })),

  on(getAllLoanTypesActionFail, (state, action)=>({
    ...state,
    isLoading : false,
    error: action.error
  })),
)
