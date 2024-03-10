import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from '@simpler/api/auth';
import { Auth } from '@simpler/types';
import { selectUserById, UserActions } from '@simpler/users';
import { fromEvent, Observable, of, timer } from 'rxjs';
import {
  map,
  catchError,
  exhaustMap,
  tap,
  switchMap,
  startWith,
} from 'rxjs/operators';
import { AuthActions, AuthApiActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  readonly init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() => this.getPersistedAuth()),
      map((auth) => AuthActions.init(auth ?? {}))
    )
  );

  readonly syncUser$ = createEffect(() =>
    this.actions$.pipe(
      exhaustMap(() => this.getPersistedAuth()),
      switchMap((auth) => {
        if (auth?.user) {
          const { id } = auth.user;

          this.store.dispatch(UserActions.loadUser({ id }));

          return this.store.pipe(selectUserById(id));
        }

        return of(null);
      }),
      map((user) => AuthActions.syncUser({ user }))
    )
  );

  readonly forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      exhaustMap((action) =>
        this.authService.forgotPassword(action.email).pipe(
          map(() => AuthApiActions.forgotPasswordSuccess()),
          catchError((error) =>
            of(AuthApiActions.forgotPasswordFailure({ error }))
          )
        )
      )
    )
  );

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login(action).pipe(
          map((auth) => AuthApiActions.loginSuccess(auth)),
          tap(({ type, ...auth }) => this.persistAuth({ ...auth })),
          catchError((error) => of(AuthApiActions.loginFailure({ error })))
        )
      )
    )
  );

  readonly logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(({ type, ...props }) =>
        // ? not needed as long as refresh token logic is not implemented
        // this.authService.logout(props)
        timer(100).pipe(
          map(() => AuthApiActions.logoutSuccess()),
          catchError((error) => of(AuthApiActions.logoutFailure({ error }))),
          tap(() => this.resetAuth())
        )
      ),
    )
  );

  readonly resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      exhaustMap(({ userId, password }) =>
        this.authService.resetPassword(userId, password).pipe(
          map(() => AuthApiActions.resetPasswordSuccess()),
          catchError((error) =>
            of(AuthApiActions.resetPasswordFailure({ error }))
          )
        )
      )
    )
  );

  readonly signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      exhaustMap((action) =>
        this.authService.signUp(action).pipe(
          map((auth) => AuthApiActions.signUpSuccess(auth)),
          tap(({ type, ...auth }) => this.persistAuth({ ...auth })),
          catchError((error) => of(AuthApiActions.signUpFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly store: Store
  ) {}

  private getPersistedAuth(): Observable<Auth | null> {
    return fromEvent(window, 'auth').pipe(
      startWith(null),
      switchMap(() => {
        const auth = localStorage.getItem('auth');

        if (auth) {
          return of(JSON.parse(auth));
        }

        return of(null);
      })
    );
  }

  private persistAuth(auth: Auth) {
    localStorage.setItem('auth', JSON.stringify(auth));
    window.dispatchEvent(new Event('auth'));
  }

  private resetAuth() {
    localStorage.removeItem('auth');
    window.dispatchEvent(new Event('auth'));
  }
}
