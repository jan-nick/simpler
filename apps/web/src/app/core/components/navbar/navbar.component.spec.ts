import { NavbarComponent, NavbarState } from './navbar.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { Provider } from '@angular/core';
import { NavbarLoggedInComponent } from './navbar-logged-in/navbar-logged-in.component';
import { NavbarLoggedOutComponent } from './navbar-logged-out/navbar-logged-out.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent, IconComponent, LogoComponent } from '@simpler/ui';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';

const routerEventsSubject = new ReplaySubject<RouterEvent>(1);

const routerStub: Provider = {
  provide: Router,
  useValue: {
    navigate: jest.fn(),
    events: routerEventsSubject.asObservable(),
  },
};

const activatedRouteRoot = { firstChild: { snapshot: { data: {} } } };

const activatedRouteStub: Provider = {
  provide: ActivatedRoute,
  useValue: {
    root: activatedRouteRoot,
  },
};

describe('NavbarComponent', () => {
  let spectator: Spectator<NavbarComponent>;
  let component: NavbarComponent;

  let logoElement: HTMLElement | null;

  const createComponent = createComponentFactory({
    component: NavbarComponent,
    declarations: [
      MockComponents(
        ButtonComponent,
        IconComponent,
        LogoComponent,
        NavbarLoggedInComponent,
        NavbarLoggedOutComponent
      ),
    ],
    imports: [
      HttpClientTestingModule,
      MockModule(RouterTestingModule),
      MockModule(TranslateModule),
    ],
    providers: [
      MockProvider(TranslateService),
      activatedRouteStub,
      routerStub,
      provideMockStore({
        selectors: [{ selector: selectUser, value: userMockFactory() }],
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    logoElement = spectator.query('simpler-logo');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show logo for states only-logo and logged-out', () => {
    spectator.setInput({ state$: of(NavbarState.OnlyLogo) });
    spectator.detectChanges();

    logoElement = spectator.query('simpler-logo');

    expect(logoElement).toBeTruthy();

    spectator.setInput({ state$: of(NavbarState.LoggedOut) });
    spectator.detectChanges();

    logoElement = spectator.query('simpler-logo');

    expect(logoElement).toBeTruthy();

    spectator.setInput({ state$: of(NavbarState.LoggedIn) });
    spectator.detectChanges();

    logoElement = spectator.query('simpler-logo');

    expect(logoElement).toBeFalsy();
  });

  describe('state$', () => {
    it('should emit on NavigationEnd event', () => {
      let emittedTimes = 0;

      component.state$.subscribe(() => emittedTimes++);

      routerEventsSubject.next(new NavigationStart(0, 'url'));
      routerEventsSubject.next(
        new NavigationEnd(0, 'url', 'urlAfterRedirects')
      );

      expect(emittedTimes).toBe(2);
    });

    it('should call getNavbarState on emit', () => {
      jest.spyOn(component, 'getNavbarState');

      component.state$.subscribe(() => {
        expect(component.getNavbarState).toBeCalled();
      });
    });
  });

  describe('getNavbarState', () => {
    it('should get navbarState from route data', () => {
      expect(component.getNavbarState()).toBe(NavbarState.LoggedOut);

      activatedRouteRoot.firstChild.snapshot.data = {
        navbarState: NavbarState.LoggedIn,
      };
      expect(component.getNavbarState()).toBe(NavbarState.LoggedIn);

      activatedRouteRoot.firstChild.snapshot.data = {
        navbarState: NavbarState.OnlyLogo,
      };
      expect(component.getNavbarState()).toBe(NavbarState.OnlyLogo);
    });
  });

  it('should set tabIndex on logo element to 0', () => {
    expect(logoElement?.tabIndex).toBe(0);
  });

  it('should navigate to empty path on logo press enter', () => {
    const navigateSpy = jest.spyOn(spectator.inject(Router), 'navigate');

    const event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 'enter',
    });

    logoElement?.dispatchEvent(event);
    spectator.detectChanges();

    expect(navigateSpy).toBeCalledTimes(1);
    expect(navigateSpy).toBeCalledWith(['']);
  });

  it('should navigate to empty path on logo click', () => {
    const navigateSpy = jest.spyOn(spectator.inject(Router), 'navigate');

    logoElement?.click();

    expect(navigateSpy).toBeCalledTimes(1);
    expect(navigateSpy).toBeCalledWith(['']);
  });
});
