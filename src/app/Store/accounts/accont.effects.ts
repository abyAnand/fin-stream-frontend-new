import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AccountService } from "src/app/core/services/account/account.service";
import { getAllAccountsByBank } from "./account.action";
import { mergeMap } from "rxjs";

@Injectable()
export class AccountEffects{

  constructor(
    private action$ : Actions,
    private accountService: AccountService
  ){}


}
