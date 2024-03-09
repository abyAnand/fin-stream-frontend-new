import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../types/appState.interface";
import { AccountDto } from "src/app/core/models/account/AccountDto.model";

export const accountSelector = (state: AppStateInterface) => state.accountList;

export const allUserAccountsSelector = createSelector(
  accountSelector,
  (state) => state.accountList
);


export const userAccountsLoadingSelector = createSelector(
  accountSelector,
  (state) => state.isLoading
);

export const userAccountsErrorSelector = createSelector(
  accountSelector,
  (state) => state.error
);

// Selector to get a single user account based on its id
export const singleUserAccountSelector = (accountId: string) =>
  createSelector(
    allUserAccountsSelector, //  selector to get all user accounts
    (accountList) => accountList.find((account) => account.id === accountId)
  );

  export const updatedSingleUserAccountSelector = (updatedAccount: AccountDto) =>
  createSelector(
    allUserAccountsSelector, // Use the selector to get all user accounts
    (accountList) =>
      accountList.map((account) =>
        account.id === updatedAccount.id ? updatedAccount : account
      )
  );
