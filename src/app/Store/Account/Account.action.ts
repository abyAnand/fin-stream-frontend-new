import { createAction, props } from "@ngrx/store";
import { AccountDto } from "src/app/core/models/account/AccountDto.model";


export const getAllUserAccounts =  createAction(
  '[ACCOUNT] GET BY USER_ID',
  props<{userId: string}>()
);

export const getAllUserAccountsSuccess = createAction(
  '[ACCOUNT] GET BY USER_ID SUCCESS',
  props<{accountList: AccountDto[]}>()
);

export const getAllUserAccountsFail = createAction(
  '[ACCOUNT] GET BY USER_ID FAIL',
  props<{error: string}>()
);

// CREATE ACCOUNT SETTINGS
export const createUserAccount = createAction(
  '[ACCOUNT] CREATE',
  props<{ accountDto: AccountDto }>()
);

export const createUserAccountSuccess = createAction(
  '[ACCOUNT] CREATE SUCCESS',
  props<{ accountDto: AccountDto }>()
);

export const createUserAccountFail = createAction(
  '[ACCOUNT] CREATE FAIL',
  props<{ error: string }>()
);

// UPDATE ACCOUNT SETTINGS
export const updateUserAccount = createAction(
  '[ACCOUNT] UPDATE SUCCESS',
  props<{ accountDto: AccountDto }>()
);

export const updateUserAccountSuccess = createAction(
  '[ACCOUNT] UPDATE SUCCESS',
  props<{ accountDto: AccountDto }>()
);

export const updateUserAccountFail = createAction(
  '[ACCOUNT] UPDATE FAILED',
  props<{ error: string }>()
);

// // DELETE ACCOUNT SETTINGS
// export const deleteAccountSetting = createAction(
//   '[ACCOUNT-SETTING] DELETE',
//   props<{ accountSettingId: number }>()
// );

// export const deleteAccountSettingSuccess = createAction(
//   '[ACCOUNT-SETTING] DELETE SUCCESS',
//   props<{ accountSettingId: number }>()
// );

// export const deleteAccountSettingFail = createAction(
//   '[ACCOUNT-SETTING] DELETE FAIL',
//   props<{ error: string }>()
// );
