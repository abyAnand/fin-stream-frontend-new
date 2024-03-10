import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../types/appState.interface";

export const loanTypeSelector = (state: AppStateInterface) => state.loanTypeList;

export const allLoanTypeLoadingSelector = createSelector(
  loanTypeSelector,
  (state)=> state.isLoading
);

export const allLoanTypesSelector = createSelector(
  loanTypeSelector,
  (state)=> state.loanTypeList
);

export const allLoanTypesErrorSelector = createSelector(
  loanTypeSelector,
  (state)=> state.error
);


export const selectSingleLoanType = (loanTypeId: string) =>
  createSelector(
    loanTypeSelector,
    (state) => state.loanTypeList.find((loanType) => loanType.id === loanTypeId)
  );