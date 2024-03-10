import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { LibraryFoldersService } from '@simpler/api/library-folders';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';
import { MockProviders } from 'ng-mocks';
import { LibraryUploadService } from '../../services/library-upload.service';

import { LibraryFilesService } from './library-files.service';

describe('LibraryFilesService', () => {
  let spectator: SpectatorService<LibraryFilesService>;
  const createService = createServiceFactory({
    service: LibraryFilesService,
    providers: [
      MockProviders(
        LibraryFoldersService,
        LibraryUploadService,
        NgbModal,
        Store,
        TranslateService
      ),
      provideMockStore({
        selectors: [{ selector: selectUser, value: userMockFactory() }],
      }),
    ],
  });

  beforeEach(() => (spectator = createService()));

  it('should not be logged in', () => {
    expect(spectator.service).toBeTruthy();
  });
});
