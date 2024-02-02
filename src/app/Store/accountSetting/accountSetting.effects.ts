import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AccountSettingService } from "src/app/core/services/accountSetting/account-setting.service";
import { createAccountSetting, createAccountSettingFail, createAccountSettingSuccess, getAccountSettings, getAccountSettingsFail, getAccountSettingsSuccess, updateAccountSetting, updateAccountSettingSuccess } from "./accountSetting.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class AccountSettingEffects {

  constructor(
    private action$: Actions,
    private accountSettingService: AccountSettingService
  ) { }

  getAccountSettings$ = createEffect(() =>
    this.action$.pipe(
      ofType(getAccountSettings),
      mergeMap(action =>
        this.accountSettingService
          .getAccountSettingsListByBankIdAndAccountType(action.accountTypeListRequestDto) // Change action.listRequestDto to action.accountTypeListRequestDto
          .pipe(
            map(accountSettings => getAccountSettingsSuccess({ accountSettings })),
            catchError(error => of(getAccountSettingsFail({ error })))
          )
      )
    )
  );

  createAccountSetting$ = createEffect(() =>
    this.action$.pipe(
      ofType(createAccountSetting),
      mergeMap(({ accountSetting }) => {
        return this.accountSettingService.createAccountSetting(accountSetting)
          .pipe(
            map(accountSetting => createAccountSettingSuccess(accountSetting)),
            catchError(error => of(createAccountSettingFail({ error: error.message })))
          )
      })
    )
  );

  updateAccountSetting$ = createEffect(()=>
  this.action$.pipe(
    ofType(updateAccountSetting),
    mergeMap(({accountSetting})=>{
      return this.accountSettingService.updateAccountSetting(accountSetting)
      .pipe(
        map(accountSetting => updateAccountSettingSuccess(accountSetting)),
        catchError(error => of(createAccountSettingFail({error: error.message})))
      )
    })
  )
  );

}
