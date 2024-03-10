import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { LoanTypeService } from "src/app/core/services/loanType/loan-type.service";
import { getAllLoanTypesAction, getAllLoanTypesActionFail, getAllLoanTypesActionSuccess } from "./LoanType.action";


@Injectable()
export class LoanTypeEffects {

  constructor(
    private action$: Actions,
    private loanTypeService: LoanTypeService
  ) { }

  getAllLoanTypes$ = createEffect(() =>
    this.action$.pipe(
      ofType(getAllLoanTypesAction),
      mergeMap(() =>
        this.loanTypeService.getAllLoanTypes().pipe(
          map(loanTypeList => getAllLoanTypesActionSuccess({ loanTypeList })),
          catchError(error => of(getAllLoanTypesActionFail({ error: error.message })))
        )
      )
    )
  );

}