import { userReducers } from './../Users/user.reducers';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/core/services/user/user.service";
import { getSingleUser, getSingleUserSuccess, getSingleUserFailure, updateSingleUser, updateSingleUserSuccess, updateSingleUserFailure } from "./singleUser.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class SingleUserEffects {

  constructor(
    private action$: Actions,
    private userService: UserService
  ) { }

  getSingleUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(getSingleUser),
      mergeMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map(user => getSingleUserSuccess({ user })),
          catchError(error => of(getSingleUserFailure({ error: error.message })))
        )
      )
    )
  );


  updateSingleUser$ = createEffect(()=>
  this.action$.pipe(
    ofType(updateSingleUser),
    mergeMap(({user})=>{
      return this.userService.updateUser(user)
      .pipe(
        map(user => updateSingleUserSuccess(user)),
        catchError(error => of(updateSingleUserFailure({error: error.message})))
      )
    })
  )
  );

}
