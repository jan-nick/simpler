import { FileDownloadButtonComponent } from './file-download-button.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import {
  MockComponents,
  MockModule,
  MockProvider,
  MockProviders,
} from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '@simpler/api/storage';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';
import { IconButtonComponent } from '@simpler/ui';
import { LibraryFileUtilityService } from '@simpler/library-files';

describe('FileDownloadButtonComponent', () => {
  let spectator: Spectator<FileDownloadButtonComponent>;

  const createComponent = createComponentFactory({
    component: FileDownloadButtonComponent,
    declarations: [MockComponents(IconButtonComponent)],
    imports: [MockModule(NgbTooltipModule), MockModule(TranslateModule)],
    providers: [
      MockProvider(LibraryFileUtilityService, {
        downloadFile: jest.fn(() => of()),
      }),
      MockProvider(StorageService, {
        getSignedUrl: jest.fn(() => of()),
      }),
      MockProviders(TranslateService),
      provideMockStore({
        selectors: [
          {
            selector: selectUser,
            value: userMockFactory(),
          },
        ],
      }),
    ],
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
