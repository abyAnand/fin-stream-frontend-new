import { createAction, props } from "@ngrx/store";
import { AccountDto } from '../../core/models/account/AccountDto.model';


//GET ALL ACCOUNTS

export const getAllAccountsByBank = createAction
(
  '[ACCOUNT] GET ALL BY BANK'
);

export const getAllAccountsByBankSuccess = createAction(
  '[ACCOUNT] GET-ALL SUCCESS',
  props<{accounts: AccountDto[]}>()
);

export const getAllAccountsByBankFailure = createAction(
  '[ACCOUNT] GET-ALL FAILURE',
  props<{error: string[]}>()
);


// CREATE ACCOUNT
export const createAccount = createAction(
  '[ACCOUNT] CREATE ACCOUNT',
  props<{ account: AccountDto }>()
);

export const createAccountSuccess = createAction(
  '[ACCOUNT] CREATE SUCCESS',
  props<{ account: AccountDto }>()
);

export const createAccountFailure = createAction(
  '[ACCOUNT] CREATE FAIL',
  props<{ error: string }>()
);

// UPDATE ACCOUNT
export const updateAccount = createAction(
  '[ACCOUNT] UPDATE',
  props<{ accountId: number; account: AccountDto }>()
);

export const updateAccountSuccess = createAction(
  '[ACCOUNT] UPDATE SUCCESS',
  props<{ account: AccountDto }>()
);

export const updateAccountFailure = createAction(
  '[ACCOUNT] UPDATE FAIL',
  props<{ error: string }>()
);

// DELETE ACCOUNT
export const deleteAccount = createAction(
  '[ACCOUNT] DELETE',
  props<{ accountId: number }>()
);

export const deleteAccountSuccess = createAction(
  '[ACCOUNT] DELETE SUCCESS',
  props<{ accountId: number }>()
);

export const deleteAccountFailure = createAction(
  '[ACCOUNT] DELETE FAIL',
  props<{ error: string }>()
);



