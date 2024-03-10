import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '@simpler/api/users';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { UserActions, UserApiActions } from './user.actions';

@Injectable()
export class UserEffects {
  readonly addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap((action) =>
        from(this.usersService.create(action.user)).pipe(
          map((user) =>
            UserApiActions.addUserSuccess({
              user,
            })
          ),
          catchError((error) => of(UserApiActions.addUserFailure({ error })))
        )
      )
    )
  );

  readonly deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((action) =>
        from(this.usersService.delete(action.id)).pipe(
          map(({ id }) =>
            UserApiActions.deleteUserSuccess({
              id,
            })
          ),
          catchError((error) => of(UserApiActions.deleteUserFailure({ error })))
        )
      )
    )
  );

  readonly loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap((action) =>
        this.usersService.findOne(action.id).pipe(
          map((user) =>
            UserApiActions.loadUserSuccess({
              user,
            })
          ),
          catchError((error) => of(UserApiActions.loadUserFailure({ error })))
        )
      )
    )
  );

  readonly loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap((action) =>
        this.usersService.findAll(action.args).pipe(
          map((users) =>
            UserApiActions.loadUsersSuccess({
              users,
            })
          ),
          catchError((error) => of(UserApiActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  readonly updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ update }) =>
        from(
          this.usersService.update(update.id as string, update.changes)
        ).pipe(
          map((user) =>
            UserApiActions.updateUserSuccess({
              user,
            })
          ),
          catchError((error) => of(UserApiActions.updateUserFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly usersService: UsersService
  ) {}
}
