import { createAction, props } from "@ngrx/store";
import { LoanType } from "src/app/core/models/loan/LoanType.model";

// get all loanTypes
export const getAllLoanTypesAction = createAction(
  '[LOAN-TYPE] GET-ALL'
  );

  export const getAllLoanTypesByBankIdAction = createAction(
    '[LOAN-TYPE] GET-ALL',
    props<{bankId: number}>()
    );

export const getAllLoanTypesActionSuccess = createAction(
  '[LOAN-TYPE] GET-ALL SUCCESS',
  props<{loanTypeList: LoanType[]}>()
  );

export const getAllLoanTypesActionFail = createAction(
  '[LOAN-TYPE] GET-ALL FAIL',
  props<{error: string}>()
  );



