import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, Observable, startWith, tap } from 'rxjs';

export enum NavbarState {
  DetermineFromAuth = 'determine-from-auth',
  LoggedIn = 'logged-in',
  LoggedOut = 'logged-out',
  OnlyLogo = 'only-logo',
}
import { rotateInOnEnterAnimation } from 'angular-animations';
import { AnimationDuration } from '@simpler/types';
import { Store } from '@ngrx/store';
import { selectUser } from '@simpler/auth';

@Component({
  selector: 'simpler-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    rotateInOnEnterAnimation({ duration: AnimationDuration.Normal }),
  ],
})
export class NavbarComponent {
  readonly isAuthenticated$ = this.store
    .select(selectUser)
    .pipe(map((user) => !!user));
  readonly state$: Observable<NavbarState> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() => this.getNavbarState()),
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  getNavbarState() {
    const navbarState: NavbarState | undefined =
      this.activatedRoute.root.firstChild?.snapshot.data?.['navbarState'];

    return navbarState ?? NavbarState.LoggedOut;
  }

  onClickLogo() {
    this.router.navigate(['']);
  }
}
