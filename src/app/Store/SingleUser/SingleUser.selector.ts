import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../types/appState.interface";


export const singleUserSelector = (state: AppStateInterface) => state.user;

export const SingleUserLoadingSelector = createSelector(
  singleUserSelector,
  (state) => state.isLoading
);

export const SingleUserSuccessSelector = createSelector(
  singleUserSelector,
  (state) => state.user

);

export const SingleUserErrorSelector = createSelector(
  singleUserSelector,
  (state) => state.error
);
