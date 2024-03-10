import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator/jest';
import { userMockFactory } from '@simpler/testing';
import { StorageService } from '@simpler/api/storage';

import { LibraryUploadService } from './library-upload.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';

describe('LibraryUploadService', () => {
  let spectator: SpectatorService<LibraryUploadService>;

  const createService = createServiceFactory({
    service: LibraryUploadService,
    providers: [
      mockProvider(Store),
      mockProvider(StorageService, {
        findUserStorageSize: jest.fn(() => of(1_000_000)),
      }),
      provideMockStore({
        selectors: [{ selector: selectUser, value: userMockFactory() }],
      }),
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('loadUserStorage', () => {
    it('should assign userStorage$', (done) => {
      spectator.service['loadUserStorage']();

      spectator.service.userStorage$.subscribe((userStorage) => {
        expect(userStorage).toBe(1_000_000);

        done();
      });
    });
  });
});
