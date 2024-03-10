import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { StorageService } from '@simpler/api/storage';
import {
  AuthActions,
  AuthState,
  selectAuth,
  selectLogoutLoaded,
  selectLogoutLoading,
  selectUser,
} from '@simpler/auth';
import { filter, firstValueFrom, of, switchMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'simpler-navbar-logged-in',
  templateUrl: './navbar-logged-in.component.html',
  styleUrls: ['./navbar-logged-in.component.scss'],
})
export class NavbarLoggedInComponent {
  readonly loadingLogout$ = this.store.select(selectLogoutLoading);
  readonly user$ = this.store.select(selectUser);
  readonly avatar$ = this.user$.pipe(
    switchMap((user) => {
      if (user?.avatar) {
        return this.storageService.getSignedUrl(user.avatar);
      }
      return of();
    })
  );

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly store: Store<AuthState>
  ) {}

  async logout() {
    const { user, accessToken } = await firstValueFrom(
      this.store.select(selectAuth)
    );
    if (user && accessToken) {
      this.store.dispatch(AuthActions.logout({ user, accessToken }));

      await firstValueFrom(
        this.store.select(selectLogoutLoaded).pipe(filter((loaded) => loaded))
      );
      await this.router.navigate(['/sign-in']);
    }
  }
}
