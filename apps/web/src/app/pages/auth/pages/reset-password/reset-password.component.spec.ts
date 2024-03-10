import { ResetPasswordComponent } from './reset-password.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents, MockModule, MockProviders } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, InputComponent } from '@simpler/ui';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  selectForgotPasswordError,
  selectForgotPasswordLoaded,
  selectForgotPasswordLoading,
} from '@simpler/auth';

describe('ResetPasswordComponent', () => {
  let spectator: Spectator<ResetPasswordComponent>;
  let store: MockStore;

  const createComponent = createComponentFactory({
    component: ResetPasswordComponent,
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
          { selector: selectForgotPasswordError, value: null },
          { selector: selectForgotPasswordLoaded, value: false },
          { selector: selectForgotPasswordLoading, value: false },
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

    selectForgotPasswordLoading.setResult(true);
    store.refreshState();
    spectator.detectChanges();
    expect(submitButton?.getAttribute('ng-reflect-loading')).toBe('true');

    selectForgotPasswordLoading.setResult(false);
    store.refreshState();
    spectator.detectChanges();
    expect(submitButton?.getAttribute('ng-reflect-loading')).toBe('false');
  });

  describe('onSubmit', () => {
    describe('form is valid', () => {
      beforeEach(() => {
        spectator.component.formGroup.setValue({
          email: 'a@b',
        });
      });

      it('should dispatch action: "[Auth] Forgot Password"', () => {
        const spy = jest.spyOn(spectator.inject(Store), 'dispatch');
        spectator.component.onSubmit();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(
          AuthActions.forgotPassword({ email: 'a@b' })
        );
      });
    });
  });
});
