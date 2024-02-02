
//get all account settings

import { createAction, props } from "@ngrx/store";
import { AccountSettingDto } from '../../core/models/bank/settings/AccountSettingDto.model';
import { AccountTypeListRequestDto } from "src/app/core/models/account/AccountTypeListRequestDto.model";

export const getAccountSettings =  createAction(
  '[ACCOUNT-SETTING] GET BY ACCOUNT-TYPE',
  props<{ accountTypeListRequestDto:AccountTypeListRequestDto}>()
);

export const getAccountSettingsSuccess = createAction(
  '[ACCOUNT-SETTING] GET BY ACCOUNT-TYPE SUCCESS',
  props<{accountSettings: AccountSettingDto[]}>()
);

export const getAccountSettingsFail = createAction(
  '[ACCOUNT-SETTING] GET BY ACCOUNT-TYPE FAIL',
  props<{error: string}>()
);

// CREATE ACCOUNT SETTINGS
export const createAccountSetting = createAction(
  '[ACCOUNT-SETTING] CREATE',
  props<{ accountSetting: AccountSettingDto }>()
);

export const createAccountSettingSuccess = createAction(
  '[ACCOUNT-SETTING] CREATE SUCCESS',
  props<{ accountSetting: AccountSettingDto }>()
);

export const createAccountSettingFail = createAction(
  '[ACCOUNT-SETTING] CREATE FAIL',
  props<{ error: string }>()
);

// UPDATE ACCOUNT SETTINGS
export const updateAccountSetting = createAction(
  '[ACCOUNT-SETTING] UPDATE',
  props<{ accountSettingId: number; accountSetting: AccountSettingDto }>()
);

export const updateAccountSettingSuccess = createAction(
  '[ACCOUNT-SETTING] UPDATE SUCCESS',
  props<{ accountSetting: AccountSettingDto }>()
);

export const updateAccountSettingFail = createAction(
  '[ACCOUNT-SETTING] UPDATE FAIL',
  props<{ error: string }>()
);

// DELETE ACCOUNT SETTINGS
export const deleteAccountSetting = createAction(
  '[ACCOUNT-SETTING] DELETE',
  props<{ accountSettingId: number }>()
);

export const deleteAccountSettingSuccess = createAction(
  '[ACCOUNT-SETTING] DELETE SUCCESS',
  props<{ accountSettingId: number }>()
);

export const deleteAccountSettingFail = createAction(
  '[ACCOUNT-SETTING] DELETE FAIL',
  props<{ error: string }>()
);
