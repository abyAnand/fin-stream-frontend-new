import { createReducer, on } from "@ngrx/store";
import { AccountStateInterface } from "../types/AccountState.interface";
import { createUserAccount, createUserAccountFail, createUserAccountSuccess,  getAllUserAccounts,  getAllUserAccountsFail,  getAllUserAccountsSuccess,  updateUserAccount, updateUserAccountFail, updateUserAccountSuccess } from "./Account.action";

export const initialState: AccountStateInterface = {
  isLoading : false,
  accountList : [],
  error: null
};

export const accountReducer = createReducer(
  initialState,

  // get all accountSettings

  on(getAllUserAccounts,(state)=>({
    ...state,
    isLoading: true
  })),


  on(getAllUserAccountsSuccess, (state, action)=>({
    ...state,
    isLoading: false,
    accountList: [...action.accountList],

  })),

  on(getAllUserAccountsFail, (state, action)=>({
    ...state,
    isLoading : false,
    error: action.error
  })),


  //create account setting

  on(createUserAccount,(state, action)=>({
    ...state,
    isLoading: false,
  })),

  on(createUserAccountSuccess,(state, action)=>({
    ...state,
    isLoading: false,
    accountList: [...state.accountList, action.accountDto]
  })),

  on(createUserAccountFail, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  })),

  //update account setting

  on(updateUserAccount,(state, action)=>({
    ...state,
    isLoading: true
  })),

  on(updateUserAccountSuccess,(state, action)=>({
    ...state,
    isLoading: false,
    accountList: state.accountList.map((account) => (account.id === action.accountDto.id ? action.accountDto : account))
  })),

  on(updateUserAccountFail, (state, action)=>({
    ...state,
    isLoading: false,
    error: action.error
  })),
)
