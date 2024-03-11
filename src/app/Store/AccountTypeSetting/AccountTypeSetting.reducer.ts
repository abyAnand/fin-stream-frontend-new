import { createReducer, on } from "@ngrx/store";
import { AccountTypeSettingStateInterface } from "../types/AccountTypeSettingState.interface";
import { getAccountTypeSettingsAction, getAccountTypeSettingsFailureAction, getAccountTypeSettingsSuccessAction, updateAccountTypeSetting, updateAccountTypeSettingSuccess } from "./AccountTypeSetting.action";

export const initialState: AccountTypeSettingStateInterface = {
  isLoading: false,
  accountTypeSettingList: [],
  error: null
};

export const accountTypeSettingReducer = createReducer(
  initialState,

  // get all accountTypeSettings
  on(getAccountTypeSettingsAction, (state) =>({
    ...state,
    isLoading: true
  })),
  on(getAccountTypeSettingsSuccessAction, (state, action) =>({
    ...state,
    isLoading: false,
    accountTypeSettingList: action.accountTypeSettingList
  })),
  on(getAccountTypeSettingsFailureAction, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  })),

  // //create user

  // on(createAccountTypeSetting,(state) =>({
  //   ...state,
  //   isLoading: true
  // })),

  // on(createAccountTypeSettingSuccess, (state, action) =>({
  //   ...state,
  //   isLoading:false,
  //   accountTypeSettingList: [...state.accountTypeSettingList, action.accountTypeSetting]
  // })),

  // on(createAccountTypeSettingFailure, (state, action) =>({
  //   ...state,
  //   isLoading: false,
  //   error: action.error
  // })),


  )
