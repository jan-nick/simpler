import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import { MockModule } from 'ng-mocks';

import { NavbarLoggedOutComponent } from './navbar-logged-out.component';

describe('NavbarLoggedOutComponent', () => {
  let spectator: Spectator<NavbarLoggedOutComponent>;

  const createComponent = createComponentFactory({
    component: NavbarLoggedOutComponent,
    declarations: [NavbarLoggedOutComponent],
    imports: [MockModule(RouterTestingModule), MockModule(TranslateModule)],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should navigate to sign-in', async () => {
    const signInButton = spectator.query('#sign-in-button');

    expect(signInButton).toHaveAttribute('routerLink', 'sign-in');
  });

  it('should navigate to sign-up', async () => {
    const signUpButton = spectator.query('#sign-up-button');

    expect(signUpButton).toHaveAttribute('routerLink', 'sign-up');
  });
});
