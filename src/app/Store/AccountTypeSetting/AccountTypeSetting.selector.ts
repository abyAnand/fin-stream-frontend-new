import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../types/appState.interface";

export const selectAccountTypeSetting = (state: AppStateInterface) => state.accountTypeSettingList;

export const isLoadingAccountTypeSettingSelector = createSelector(
  selectAccountTypeSetting,
  (state) => state.isLoading
);

export const accountTypeSettingSelectorSuccess = createSelector(
  selectAccountTypeSetting,
  (state) => state.accountTypeSettingList

);

export const accountTypeSettingSelectorFail = createSelector(
  selectAccountTypeSetting,
  (state) => state.error
);