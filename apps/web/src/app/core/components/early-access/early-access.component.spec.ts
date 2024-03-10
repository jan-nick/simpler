import { EarlyAccessComponent } from './early-access.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents, MockModule, MockProviders } from 'ng-mocks';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, InputComponent } from '@simpler/ui';
import { EarlyAccessService } from '../../services/early-access.service';

describe('EarlyAccessComponent', () => {
  let spectator: Spectator<EarlyAccessComponent>;

  const createComponent = createComponentFactory({
    component: EarlyAccessComponent,
    declarations: [MockComponents(ButtonComponent, InputComponent)],
    imports: [MockModule(TranslateModule)],
    providers: [MockProviders(EarlyAccessService)],
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
