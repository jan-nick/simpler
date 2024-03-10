import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth.reducer';
import { selectUser } from '../state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class SignedOutGuard  {
  constructor(
    private readonly router: Router,
    private readonly store: Store<AuthState>
  ) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot
  ): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map((user) => !user),
      tap((canActivate) => {
        if (!canActivate) {
          const redirectTo =
            activatedRouteSnapshot.data['redirectToOnDeactivate'] || '/404';

          this.router.navigate([redirectTo]);
        }
      })
    );
  }
}
