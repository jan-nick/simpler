import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';
import { NavbarLoggedInComponent } from './navbar-logged-in.component';
import { AvatarComponent, ButtonComponent } from '@simpler/ui';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  AuthActions,
  initialState,
  selectAuth,
  selectLogoutError,
  selectLogoutLoaded,
  selectLogoutLoading,
} from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';
import { StorageService } from '@simpler/api/storage';
import { of } from 'rxjs';
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

describe('NavbarLoggedInComponent', () => {
  let spectator: Spectator<NavbarLoggedInComponent>;
  let store: MockStore;

  const createComponent = createComponentFactory({
    component: NavbarLoggedInComponent,
    declarations: [MockComponents(AvatarComponent, ButtonComponent)],
    imports: [
      MockModule(NgbDropdownModule),
      MockModule(NgbTooltipModule),
      MockModule(RouterTestingModule),
      MockModule(TranslateModule),
    ],
    providers: [
      MockProvider(StorageService, { getSignedUrl: jest.fn(() => of()) }),
      MockProvider(Store),
      provideMockStore({
        selectors: [
          {
            selector: selectAuth,
            value: {
              ...initialState,
              accessToken: 'access token',
              user: userMockFactory(),
            },
          },
          { selector: selectLogoutError, value: null },
          { selector: selectLogoutLoaded, value: false },
          { selector: selectLogoutLoading, value: false },
        ],
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    store = spectator.inject(MockStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should navigate to library on library button click', async () => {
    const button = spectator.query('#library-button');
    expect(button).toHaveAttribute('routerLink', 'library');
  });

  describe('sign out button', () => {
    it('should call logout on click', () => {
      const spy = jest.spyOn(spectator.component, 'logout');

      const button = spectator.queryLast<HTMLButtonElement>('button');
      button?.click();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('logout', () => {
    it('should dispatch action: "[Auth] Logout"', async () => {
      const spy = jest.spyOn(spectator.inject(Store), 'dispatch');

      selectLogoutLoaded.setResult(true);
      store.refreshState();
      await spectator.component.logout();

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(
        AuthActions.logout({
          accessToken: 'access token',
          user: userMockFactory(),
        })
      );
    });
  });
});
