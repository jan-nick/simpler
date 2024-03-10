import { AppComponent } from './app.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule, MockProviders } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from './core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      HttpClientTestingModule,
      MockModule(CoreModule),
      MockModule(RouterTestingModule),
      MockModule(TranslateModule),
    ],
    providers: [MockProviders(TranslateService)],
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
