import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';
import { MockProviders } from 'ng-mocks';
import { LibraryUploadService } from '../../services/library-upload.service';
import { LibraryRecentService } from './library-recent.service';

describe('LibraryRecentService', () => {
  let spectator: SpectatorService<LibraryRecentService>;
  const createService = createServiceFactory({
    service: LibraryRecentService,
    providers: [
      MockProviders(LibraryUploadService, NgbModal, Store, TranslateService),
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
