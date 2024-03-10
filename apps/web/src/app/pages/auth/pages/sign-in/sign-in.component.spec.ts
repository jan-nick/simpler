import { SignInComponent } from './sign-in.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents, MockModule, MockProviders } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, InputComponent } from '@simpler/ui';
import {
  AuthActions,
  selectLoginError,
  selectLoginLoaded,
  selectLoginLoading,
} from '@simpler/auth';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

describe('SignInComponent', () => {
  let spectator: Spectator<SignInComponent>;
  let store: MockStore;

  const createComponent = createComponentFactory({
    component: SignInComponent,
    declarations: [MockComponents(ButtonComponent, InputComponent)],
    imports: [
      MockModule(FormsModule),
      MockModule(ReactiveFormsModule),
      MockModule(RouterTestingModule),
      MockModule(TranslateModule),
    ],
    providers: [
      MockProviders(FormGroup, Store, TranslateService),
      provideMockStore({
        selectors: [
          { selector: selectLoginError, value: null },
          { selector: selectLoginLoaded, value: false },
          { selector: selectLoginLoading, value: false },
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

  it('should set loading attribute of submit-button to loading', () => {
    const submitButton = spectator.query('#submit-button');

    selectLoginLoading.setResult(true);
    store.refreshState();
    spectator.detectChanges();
    expect(submitButton?.getAttribute('ng-reflect-loading')).toBe('true');

    selectLoginLoading.setResult(false);
    store.refreshState();
    spectator.detectChanges();
    expect(submitButton?.getAttribute('ng-reflect-loading')).toBe('false');
  });

  describe('onSubmit', () => {
    describe('form is valid', () => {
      beforeEach(() => {
        spectator.component.formGroup.setValue({
          email: 'a@b',
          password: '12345678Ab',
        });
      });

      it('should dispatch action: "[Auth] Login"', () => {
        const spy = jest.spyOn(spectator.inject(Store), 'dispatch');
        spectator.component.onSubmit();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(
          AuthActions.login({ email: 'a@b', password: '12345678Ab' })
        );
      });
    });
  });
});
