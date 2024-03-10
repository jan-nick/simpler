import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MockProviders } from 'ng-mocks';

import { LibraryFileEffects } from './/library-file.effects';
import { Action, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { LibraryFilesService } from '@simpler/api/library-files';

describe('LibraryFileEffects', () => {
  let spectator: SpectatorService<LibraryFileEffects>;
  let actions$ = new Observable<Action>();

  const createService = createServiceFactory({
    service: LibraryFileEffects,
    providers: [
      MockProviders(LibraryFilesService, Store),
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
