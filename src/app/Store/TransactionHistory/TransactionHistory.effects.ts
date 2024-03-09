import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { TransactionService } from "src/app/core/services/transaction/transaction.service";
import { getTransactionHistory, getTransactionHistoryFail, getTransactionHistorySuccess } from "./TransactionHistory.action";

@Injectable()
export class TransactionHistoryEffects {

  constructor(
    private action$: Actions,
    private transactionService: TransactionService
  ) { }

  getTransactionHistory$ = createEffect(() =>
  this.action$.pipe(
    ofType(getTransactionHistory),
    mergeMap(({ accountId }) =>
      this.transactionService.getTransactionsByAccountId(accountId).pipe(
        map(transactionHistoryList => getTransactionHistorySuccess({ transactionHistoryList })),
        catchError(error => of(getTransactionHistoryFail({ error })))
      )
    )
  )
);
}
