import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../types/appState.interface";

export const bankSelector = (state: AppStateInterface) => state.bankList;

export const allBankLoadingSelector = createSelector(
  bankSelector,
  (state)=> state.isLoading
);

export const allBankSelector = createSelector(
  bankSelector,
  (state)=> state.bankList
);

export const allBankErrorSelector = createSelector(
  bankSelector,
  (state)=> state.error
);


export const selectSingleBankSelector = (bankId: string) =>
  createSelector(
    bankSelector,
    (state) => state.bankList.find((bank) => bank.id === bankId)
  );

