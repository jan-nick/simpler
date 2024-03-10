import { SidenavComponent } from './sidenav.component';

import { MockComponents, MockProvider } from 'ng-mocks';
import { TranslateService } from '@ngx-translate/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { ButtonComponent } from '../button/button.component';
import { DividerComponent } from '../divider/divider.component';

describe('SidenavComponent', () => {
  let spectator: SpectatorHost<SidenavComponent>;
  let component: SidenavComponent;
  let dividerElement: Element | null;

  const createHost = createHostFactory({
    component: SidenavComponent,
    declarations: [MockComponents(ButtonComponent, DividerComponent)],
    providers: [MockProvider(TranslateService)],
  });

  beforeEach(() => {
    spectator = createHost(
      `<simpler-sidenav>Sidenav Content</simpler-sidenav>`
    );
    component = spectator.component;

    dividerElement = spectator.query('simpler-divider.simpler-sidenav-divider');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set divider direction to vertical', () => {
    expect(dividerElement).toHaveAttribute('direction', 'vertical');
  });
});
