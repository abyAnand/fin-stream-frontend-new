import { createReducer, on } from "@ngrx/store";
import { AccountSettingStateInterface } from "../types/AccountSettingState.interface";
import { createAccountSetting, createAccountSettingFail, createAccountSettingSuccess, getAccountSettings, getAccountSettingsFail, getAccountSettingsSuccess, updateAccountSetting, updateAccountSettingFail, updateAccountSettingSuccess } from "./accountSetting.action";
import { AccountSetting } from '../../core/models/bank/settings/AccountSetting.model';

export const initialState: AccountSettingStateInterface = {
  isLoading : false,
  accountSettings : [],
  error: null
};

export const accountSettingReducer = createReducer(
  initialState,

  // get all accountSettings

  on(getAccountSettings,(state)=>({
    ...state,
    isLoading: true
  })),


  on(getAccountSettingsSuccess, (state, action)=>({
    ...state,
    isLoading: false,
    accountSettings: action.accountSettings,
  
  })),

  on(getAccountSettingsFail, (state, action)=>({
    ...state,
    isLoading : false,
    error: action.error
  })),


  //create account setting

  on(createAccountSetting,(state, action)=>({
    ...state,
    isLoading: false,
  })),

  on(createAccountSettingSuccess,(state, action)=>({
    ...state,
    isLoading: false,
    accountSettings: [...state.accountSettings, action.accountSetting]
  })),

  on(createAccountSettingFail, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  })),

  //update account setting

  on(updateAccountSetting,(state, action)=>({
    ...state,
    isLoading: true
  })),

  on(updateAccountSettingSuccess,(state, action)=>({
    ...state,
    isLoading: false,
    accountSettingList: state.accountSettings.map((accountSetting) => (accountSetting.id === action.accountSetting.id ? action.accountSetting : accountSetting))
  })),

  on(updateAccountSettingFail, (state, action)=>({
    ...state,
    isLoading: false,
    error: action.error
  })),


  //delete account setting


)
