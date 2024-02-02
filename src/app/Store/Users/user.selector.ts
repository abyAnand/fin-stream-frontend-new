import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../types/appState.interface";

export const selectUser = (state: AppStateInterface) => state.users;

export const isLoadingSelector = createSelector(
  selectUser,
  (state)=> state.isLoading
);

export const usersSelector = createSelector(
  selectUser,
  (state)=> state.users
);

export const errorSelector = createSelector(
  selectUser,
  (state)=> state.error
);


export const selectSingleUser = (userId: string) =>
  createSelector(
    selectUser,
    (state) => state.users.find((user) => user.id === userId)
  );

export const isLoadingSingleSelector = createSelector(
  selectUser,
  (state) => state.isLoading
);

export const singleUsersSelector = createSelector(
  selectUser,
  (state) => state.users
);

export const singleErrorSelector = createSelector(
  selectUser,
  (state) => state.error
);

