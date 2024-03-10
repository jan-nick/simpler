import { NewPasswordSuccessComponent } from './new-password-success.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewPasswordSuccessComponent', () => {
  let spectator: Spectator<NewPasswordSuccessComponent>;

  const createComponent = createComponentFactory({
    component: NewPasswordSuccessComponent,
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
