import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { BankService } from "src/app/core/services/bank/bank.service";
import { getAllBanksAction, getAllBanksActionFail, getAllBanksActionSuccess } from "./Bank.action";

@Injectable()
export class BankEffects {

  constructor(
    private action$: Actions,
    private bankService: BankService
  ) { }

  getAllBanks$ = createEffect(() =>
    this.action$.pipe(
      ofType(getAllBanksAction),
      mergeMap(() =>
        this.bankService.getAllBanks().pipe(
          map(bankList => getAllBanksActionSuccess({ bankList })),
          catchError(error => of(getAllBanksActionFail({ error: error.message })))
        )
      )
    )
  );

}
