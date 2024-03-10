import { FileLinkButtonComponent } from './file-link-button.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents, MockModule, MockProviders } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { IconButtonComponent } from '@simpler/ui';

describe('FileLinkButtonComponent', () => {
  let spectator: Spectator<FileLinkButtonComponent>;

  const createComponent = createComponentFactory({
    component: FileLinkButtonComponent,
    declarations: [MockComponents(IconButtonComponent)],
    imports: [MockModule(NgbTooltipModule), MockModule(TranslateModule)],
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
