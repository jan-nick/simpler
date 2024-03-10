import { SettingsComponent } from './settings.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SettingsSidenavComponent } from './components/settings-sidenav/settings-sidenav.component';

describe('SettingsComponent', () => {
  let spectator: Spectator<SettingsComponent>;

  const createComponent = createComponentFactory({
    component: SettingsComponent,
    declarations: [MockComponent(SettingsSidenavComponent)],
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
