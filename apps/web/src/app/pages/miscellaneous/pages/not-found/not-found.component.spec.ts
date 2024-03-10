import { NotFoundComponent } from './not-found.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundComponent', () => {
  let spectator: Spectator<NotFoundComponent>;

  const createComponent = createComponentFactory({
    component: NotFoundComponent,
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
