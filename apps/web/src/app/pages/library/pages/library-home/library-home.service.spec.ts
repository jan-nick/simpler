import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';
import { LibraryHomeService } from './library-home.service';

describe('LibraryHomeService', () => {
  let spectator: SpectatorService<LibraryHomeService>;
  const createService = createServiceFactory({
    service: LibraryHomeService,
    providers: [
      mockProvider(Store),
      provideMockStore({
        selectors: [{ selector: selectUser, value: userMockFactory() }],
      }),
    ],
  });

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});
