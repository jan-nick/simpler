import { EmailConfirmSuccessComponent } from './email-confirm-success.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EmailConfirmSuccessComponent', () => {
  let spectator: Spectator<EmailConfirmSuccessComponent>;

  const createComponent = createComponentFactory({
    component: EmailConfirmSuccessComponent,
    imports: [MockModule(RouterTestingModule), MockModule(TranslateModule)],
    providers: [
      MockProvider(TranslateService),
      MockProvider(ActivatedRoute, {
        params: of({}),
      }),
    ],
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
});
