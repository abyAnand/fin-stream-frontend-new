import { createAction, props } from "@ngrx/store";
import { AccountTypeSetting } from "src/app/core/models/account/AccountTypeSetting.model";

// get all account-type-setting
export const getAccountTypeSettingsAction = createAction(
  '[ACCOUNT-TYPE SETTING] GET-ALL',
  props<{bankId: number}>()
  );

export const getAccountTypeSettingsSuccessAction = createAction(
  '[ACCOUNT-TYPE SETTING] GET-ALL SUCCESS',
  props<{accountTypeSettingList: AccountTypeSetting[]}>()
  );

export const getAccountTypeSettingsFailureAction = createAction(
  '[ACCOUNT-TYPE SETTING] GET-ALL FAIL',
  props<{error: string}>()
  );

// // create account-type-setting

// export const createAccountTypeSetting = createAction(
//   '[ACCOUNT-TYPE SETTING] CREATE USER',
//   props<{ accountTypeSettingList: AccountTypeSetting }>()
// );

// export const createAccountTypeSettingSuccess = createAction(
//   '[ACCOUNT-TYPE SETTING] CREATE SUCCESS',
//   props<{ accountTypeSetting: AccountTypeSetting }>()
// );

// export const createAccountTypeSettingFailure = createAction(
//   '[ACCOUNT-TYPE SETTING] CREATE FAIL',
//   props<{ error: string }>()
// );


//update acount-type-setting

export const updateAccountTypeSetting = createAction(
  '[ACCOUNT-TYPE SETTING] UPDATE',
  props<{  accountTypeSettingList: AccountTypeSetting}>()
);

export const updateAccountTypeSettingSuccess = createAction(
  '[ACCOUNT-TYPE SETTING] UPDATE SUCCESS',
  props<{ accountTypeSettingList: AccountTypeSetting }>()
);

export const updateAccountTypeSettingFailure = createAction(
  '[ACCOUNT-TYPE SETTING] UPDATE FAIL',
  props<{ error: string }>()
);



//delete account-type-setting

export const deleteAccountTypeSetting = createAction(
  '[ACCOUNT-TYPE SETTING] DELETE',
  props<{ userId: number }>()
);

export const deleteAccountTypeSettingSuccess = createAction(
  '[ACCOUNT-TYPE SETTING] DELETE SUCCESS',
  props<{ userId: number }>()
);

export const deleteAccountTypeSettingFailure = createAction(
  '[ACCOUNT-TYPE SETTING] DELETE FAIL',
  props<{ error: string }>()
);
