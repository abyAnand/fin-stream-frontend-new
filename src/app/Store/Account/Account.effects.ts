import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { AccountService } from "src/app/core/services/account/account.service";
import { createUserAccount, createUserAccountFail, createUserAccountSuccess, getAllUserAccounts, getAllUserAccountsFail, getAllUserAccountsSuccess, updateUserAccount, updateUserAccountFail, updateUserAccountSuccess } from "./Account.action";


@Injectable()
export class UserAccountEffects {

  constructor(
    private action$: Actions,
    private accountService: AccountService
  ) { }

  getUserAccounts$ = createEffect(() =>
    this.action$.pipe(
      ofType(getAllUserAccounts),
      mergeMap(({userId: id}) =>
        this.accountService.getUserAccounts(id) // Change action.listRequestDto to action.accountTypeListRequestDto
          .pipe(
            map(accountList => getAllUserAccountsSuccess({ accountList })),
            catchError(error => of(getAllUserAccountsFail({ error })))
          )
      )
    )
  );

  createAccount$ = createEffect(() =>
    this.action$.pipe(
      ofType(createUserAccount),
      mergeMap(({ accountDto }) => {
        return this.accountService.createAccount(accountDto)
          .pipe(
            map(account => createUserAccountSuccess(account)),
            catchError(error => of(createUserAccountFail({ error: error.message })))
          )
      })
    )
  );

  updateAccount$ = createEffect(()=>
  this.action$.pipe(
    ofType(updateUserAccount),
    mergeMap(({accountDto})=>{
      return this.accountService.updateAccount(accountDto)
      .pipe(
        map(account => updateUserAccountSuccess(account)),
        catchError(error => of(updateUserAccountFail({error: error.message})))
      )
    })
  )
  );

}
