import { PrivacyPolicyComponent } from './privacy-policy.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrivacyPolicyComponent', () => {
  let spectator: Spectator<PrivacyPolicyComponent>;

  const createComponent = createComponentFactory({
    component: PrivacyPolicyComponent,
    imports: [MockModule(RouterTestingModule), MockModule(TranslateModule)],
    providers: [MockProvider(TranslateService)],
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
