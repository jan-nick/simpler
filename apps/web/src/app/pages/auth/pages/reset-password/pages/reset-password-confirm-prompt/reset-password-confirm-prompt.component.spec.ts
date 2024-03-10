import { ResetPasswordConfirmPromptComponent } from './reset-password-confirm-prompt.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('ResetPasswordConfirmPromptComponent', () => {
  let spectator: Spectator<ResetPasswordConfirmPromptComponent>;
  let component: ResetPasswordConfirmPromptComponent;

  const createComponent = createComponentFactory({
    component: ResetPasswordConfirmPromptComponent,
    imports: [MockModule(RouterTestingModule), MockModule(TranslateModule)],
    providers: [
      MockProvider(ActivatedRoute, {
        params: of({}),
      }),
      MockProvider(Store),
      MockProvider(TranslateService),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('resendResetPasswordEmail', () => {
    describe('form is valid', () => {
      it('should set loading to true on call', () => {
        component.resendResetPasswordEmail();
      });

      it('should set loading to false on resolve', async () => {
        component.resendResetPasswordEmail();
      });
    });
  });
});
