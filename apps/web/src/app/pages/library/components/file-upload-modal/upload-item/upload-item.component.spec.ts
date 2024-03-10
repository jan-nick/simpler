import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import { mockLibraryFile } from '@simpler/testing';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';
import { DateFnsModule } from 'ngx-date-fns';

import { UploadItemComponent } from './upload-item.component';
import { FileCoverComponent, IconComponent, ItemComponent } from '@simpler/ui';
import { LibraryUploadService } from '../../../services/library-upload.service';
import { of } from 'rxjs';

describe('UploadItemComponent', () => {
  let spectator: Spectator<UploadItemComponent>;

  const createComponent = createComponentFactory({
    component: UploadItemComponent,
    declarations: [
      MockComponents(FileCoverComponent, IconComponent, ItemComponent),
    ],
    imports: [MockModule(DateFnsModule), MockModule(TranslateModule)],
    providers: [
      MockProvider(LibraryUploadService, {
        getProgress: jest.fn(() => of(0)),
      }),
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
