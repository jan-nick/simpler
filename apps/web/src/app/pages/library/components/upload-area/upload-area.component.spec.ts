import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import {
  ButtonComponent,
  IconButtonComponent,
  IconComponent,
} from '@simpler/ui';
import { MockComponents, MockModule } from 'ng-mocks';

import { UploadAreaComponent } from './upload-area.component';

describe('UploadAreaComponent', () => {
  let spectator: Spectator<UploadAreaComponent>;

  const createComponent = createComponentFactory({
    component: UploadAreaComponent,
    declarations: [
      MockComponents(ButtonComponent, IconButtonComponent, IconComponent),
    ],
    imports: [MockModule(TranslateModule)],
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
