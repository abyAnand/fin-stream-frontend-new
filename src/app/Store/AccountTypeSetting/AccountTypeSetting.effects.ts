import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { UserService } from "src/app/core/services/user/user.service";
import { getAccountSettings, getAccountSettingsSuccess } from "../accountSetting/accountSetting.action";
import { AccountSettingService } from "src/app/core/services/accountSetting/account-setting.service";
import { getAccountTypeSettingsAction, getAccountTypeSettingsFailureAction, getAccountTypeSettingsSuccessAction } from './AccountTypeSetting.action';

@Injectable()
export class AccountTypeSettingEffects{

  constructor(
    private action$ : Actions,
    private accountSettingService: AccountSettingService
  ){}


  getAccountTypeSettingsList$ = createEffect(() =>
    this.action$.pipe(
      ofType(getAccountTypeSettingsAction),
      mergeMap(({bankId: bankId}) =>
        this.accountSettingService.getAccountTypes(bankId)
          .pipe(
            map(accountTypeSettingList => getAccountTypeSettingsSuccessAction({ accountTypeSettingList })),
            catchError(error => of(getAccountTypeSettingsFailureAction({ error })))
          )
      )
    )
  );


}
