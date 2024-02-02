import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from './user.action';
import { UserService } from "src/app/core/services/user/user.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { getUsers, createUser, deleteUser } from './user.action';

@Injectable()
export class UserEffects{

  constructor(
    private action$ : Actions,
    private userService: UserService
  ){}


  getUsers$ = createEffect(()=>
    this.action$.pipe(
      ofType(UserActions.getUsers),
      mergeMap(() =>{
        return this.userService.getAllUsers()
        .pipe(
          map(users => UserActions.getUsersSuccess({users})),
          catchError(error => of(UserActions.getUsersFailure({error: error.message})))
        );
      })
    )
  );

  // createUser$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(UserActions.createUser),
  //     mergeMap(({ user }) => {
  //       return this.userService.createUser(user).pipe(
  //         map(user => UserActions.createUserSuccess( user )),
  //         catchError(error => of(UserActions.createUserFailure({ error: error.message })))
  //       );
  //     })
  //   )
  // );


  updateUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ userId, user }) =>
        this.userService.updateUser(user).pipe(
          map(() => UserActions.updateUserSuccess({ user })),
          catchError((error) => of(UserActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  // deleteUser$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(UserActions.deleteUser),
  //     mergeMap(({ userId }) =>
  //       this.userService.deleteUser(userId).pipe(
  //         map(() => UserActions.deleteUserSuccess({ userId })),
  //         catchError((error) => of(UserActions.deleteUserFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );



}
