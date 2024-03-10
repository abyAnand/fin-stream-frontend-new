import { createAction, props } from "@ngrx/store";
import { BankDto } from "src/app/core/models/bank/BankDto.model";


// get all banks
export const getAllBanksAction = createAction(
  '[BANK] GET-ALL'
  );

export const getAllBanksActionSuccess = createAction(
  '[BANK] GET-ALL SUCCESS',
  props<{bankList: BankDto[]}>()
  );

export const getAllBanksActionFail = createAction(
  '[BANK] GET-ALL FAIL',
  props<{error: string}>()
  );