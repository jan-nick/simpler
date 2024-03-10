import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MockProviders } from 'ng-mocks';

import { UserEffects } from './user.effects';
import { Action, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { UsersService } from '@simpler/api/users';

describe('UserEffects', () => {
  let spectator: SpectatorService<UserEffects>;
  let actions$ = new Observable<Action>();

  const createService = createServiceFactory({
    service: UserEffects,
    providers: [
      MockProviders(UsersService, Store),
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
