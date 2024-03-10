import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '@simpler-env';
import {
  Observable,
  Subject,
  debounceTime,
  filter,
  first,
  firstValueFrom,
  switchMap,
  tap,
} from 'rxjs';
import { AuthState } from '../state/auth.reducer';
import { AuthActions } from '../state/auth.actions';
import { selectAuth, selectLogoutLoaded } from '../state/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  readonly handle401ErrorSubject = new Subject<boolean>();

  constructor(
    private readonly router: Router,
    private readonly store: Store<AuthState>
  ) {
    this.handle401ErrorSubject
      .pipe(
        debounceTime(200),
        switchMap(() => this.store.select(selectAuth).pipe(first()))
      )
      .subscribe(async ({ user, accessToken }) => {
        if (user && accessToken) {
          this.store.dispatch(AuthActions.logout({ user, accessToken }));
          await firstValueFrom(
            this.store
              .select(selectLogoutLoaded)
              .pipe(filter((loaded) => loaded))
          );
        }

        this.router.navigate(['']);
      });
  }

  intercept(
    request: HttpRequest<unknown>,
    handler: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.getToken();

    try {
      const requestOrigin = new URL(request.url).origin;
      const backendOrigin = new URL(environment.backendUrl).origin;

      if (token && requestOrigin === backendOrigin) {
        request = this.addTokenToRequest(request, token);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}

    return handler.handle(request).pipe(
      tap({
        error: (error) => {
          if (
            error.status === 401 &&
            !request.headers.get('X-Ignore-Auth-Interceptor')
          ) {
            this.handle401ErrorSubject.next(true);
          }
        },
      })
    );
  }

  private getToken() {
    const auth = localStorage.getItem('auth');
    return auth && JSON.parse(auth).accessToken;
  }

  private addTokenToRequest(request: HttpRequest<unknown>, token: string) {
    return request.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }
}
