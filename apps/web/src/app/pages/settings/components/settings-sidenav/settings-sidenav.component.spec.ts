import { SettingsSidenavComponent } from './settings-sidenav.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents, MockModule } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import {
  DividerComponent,
  ListComponent,
  NavButtonComponent,
  SidenavComponent,
} from '@simpler/ui';
import { TranslatePipeMock } from '@simpler/testing';

describe('SettingsSidenavComponent', () => {
  let spectator: Spectator<SettingsSidenavComponent>;

  const createComponent = createComponentFactory({
    component: SettingsSidenavComponent,
    declarations: [
      MockComponents(
        DividerComponent,
        ListComponent,
        NavButtonComponent,
        SidenavComponent
      ),
      TranslatePipeMock,
    ],
    imports: [MockModule(RouterTestingModule)],
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
