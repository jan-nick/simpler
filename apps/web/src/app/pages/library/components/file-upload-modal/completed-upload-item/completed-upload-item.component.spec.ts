import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import { mockLibraryFile } from '@simpler/testing';
import { FileCoverComponent, IconComponent, ItemComponent } from '@simpler/ui';
import { MockComponents, MockModule } from 'ng-mocks';
import { DateFnsModule } from 'ngx-date-fns';

import { CompletedUploadItemComponent } from './completed-upload-item.component';

describe('CompletedUploadItemComponent', () => {
  let spectator: Spectator<CompletedUploadItemComponent>;

  const createComponent = createComponentFactory({
    component: CompletedUploadItemComponent,
    declarations: [
      MockComponents(FileCoverComponent, IconComponent, ItemComponent),
    ],
    imports: [
      MockModule(DateFnsModule),
      MockModule(NgbTooltipModule),
      MockModule(TranslateModule),
    ],
  });

  beforeEach(() => {
    spectator = createComponent({ props: { upload: mockLibraryFile } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
