import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MockProviders } from 'ng-mocks';

import { LibraryFolderEffects } from './library-folder.effects';
import { Action, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { LibraryFoldersService } from '@simpler/api/library-folders';

describe('LibraryFolderEffects', () => {
  let spectator: SpectatorService<LibraryFolderEffects>;
  let actions$ = new Observable<Action>();

  const createService = createServiceFactory({
    service: LibraryFolderEffects,
    providers: [
      MockProviders(LibraryFoldersService, Store),
      provideMockActions(() => actions$),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    actions$ = new Observable<Action>();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});
