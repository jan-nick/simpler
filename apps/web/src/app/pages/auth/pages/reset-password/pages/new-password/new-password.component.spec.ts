import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  MockComponents,
  MockModule,
  MockProvider,
  MockProviders,
} from 'ng-mocks';

import { NewPasswordComponent } from './new-password.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ButtonComponent, InputComponent } from '@simpler/ui';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  AuthActions,
  selectResetPasswordError,
  selectResetPasswordLoaded,
  selectResetPasswordLoading,
} from '@simpler/auth';
import { Store } from '@ngrx/store';

describe('NewPasswordComponent', () => {
  let spectator: Spectator<NewPasswordComponent>;
  let store: MockStore;

  const createComponent = createComponentFactory({
    component: NewPasswordComponent,
    declarations: [MockComponents(ButtonComponent, InputComponent)],
    imports: [
      MockModule(FormsModule),
      MockModule(ReactiveFormsModule),
      MockModule(RouterTestingModule),
      MockModule(TranslateModule),
    ],
    providers: [
      MockProvider(ActivatedRoute, { queryParams: of({ id: 'user-id' }) }),
      MockProviders(Store, TranslateService),
      provideMockStore({
        selectors: [
          { selector: selectResetPasswordError, value: null },
          { selector: selectResetPasswordLoaded, value: false },
          { selector: selectResetPasswordLoading, value: false },
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

    selectResetPasswordLoading.setResult(true);
    store.refreshState();
    spectator.detectChanges();
    expect(submitButton?.getAttribute('ng-reflect-loading')).toBe('true');

    selectResetPasswordLoading.setResult(false);
    store.refreshState();
    spectator.detectChanges();
    expect(submitButton?.getAttribute('ng-reflect-loading')).toBe('false');
  });

  describe('onSubmit', () => {
    describe('form is valid', () => {
      beforeEach(() => {
        spectator.component.formGroup.setValue({
          password: '12345678Ab',
        });
      });

      it('should dispatch action: "[Auth] Reset Password"', async () => {
        const spy = jest.spyOn(spectator.inject(Store), 'dispatch');
        await spectator.component.onSubmit();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(
          AuthActions.resetPassword({
            userId: 'user-id',
            password: '12345678Ab',
          })
        );
      });
    });
  });
});
