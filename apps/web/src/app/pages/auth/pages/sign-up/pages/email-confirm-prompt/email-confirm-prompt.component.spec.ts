import { EmailConfirmPromptComponent } from './email-confirm-prompt.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmailConfirmPromptComponent', () => {
  let spectator: Spectator<EmailConfirmPromptComponent>;

  const createComponent = createComponentFactory({
    component: EmailConfirmPromptComponent,
    imports: [
      MockModule(RouterTestingModule),
      MockModule(TranslateModule),
      HttpClientTestingModule,
    ],
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
