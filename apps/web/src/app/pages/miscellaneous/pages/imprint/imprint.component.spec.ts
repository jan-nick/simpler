import { ImprintComponent } from './imprint.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('ImprintComponent', () => {
  let spectator: Spectator<ImprintComponent>;

  const createComponent = createComponentFactory({
    component: ImprintComponent,
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
