import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MockProviders } from 'ng-mocks';

import { AuthEffects } from './auth.effects';
import { Action, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AuthService } from '@simpler/api/auth';

describe('AuthEffects', () => {
  let spectator: SpectatorService<AuthEffects>;
  let actions$ = new Observable<Action>();

  const createService = createServiceFactory({
    service: AuthEffects,
    providers: [
      MockProviders(AuthService, Store),
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
