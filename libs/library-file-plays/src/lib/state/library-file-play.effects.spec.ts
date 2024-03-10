import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MockProviders } from 'ng-mocks';

import { LibraryFilePlayEffects } from './library-file-play.effects';
import { Action, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { LibraryFilePlaysService } from '@simpler/api/library-file-plays';

describe('LibraryFilePlayEffects', () => {
  let spectator: SpectatorService<LibraryFilePlayEffects>;
  let actions$ = new Observable<Action>();

  const createService = createServiceFactory({
    service: LibraryFilePlayEffects,
    providers: [
      MockProviders(LibraryFilePlaysService, Store),
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
