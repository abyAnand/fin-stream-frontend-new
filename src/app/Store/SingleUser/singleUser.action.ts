import { createAction, props } from "@ngrx/store";
import { UserDto } from "src/app/core/models/user/UserDto.model";

// get user
export const getSingleUser = createAction(
  '[USER] GET',
  props<{userId: string}>()
  );

export const getSingleUserSuccess = createAction(
  '[USER] GET SUCCESS',
  props<{user: UserDto}>()
  );

export const getSingleUserFailure = createAction(
  '[USER] GET FAIL',
  props<{error: string}>()
  );


  //update user

export const updateSingleUser = createAction(
  '[USER] UPDATE',
  props<{ user: UserDto}>()
);

export const updateSingleUserSuccess = createAction(
  '[USER] UPDATE SUCCESS',
  props<{ user: UserDto }>()
);

export const updateSingleUserFailure = createAction(
  '[USER] UPDATE FAIL',
  props<{ error: string }>()
);
