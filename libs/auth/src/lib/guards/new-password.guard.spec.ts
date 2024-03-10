import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { userMockFactory } from '@simpler/testing';
import { MockProvider } from 'ng-mocks';

import { NewPasswordGuard } from './new-password.guard';
import { selectUser } from '../state/auth.selectors';
import { Store } from '@ngrx/store';

describe('NewPasswordGuard', () => {
  let spectator: SpectatorService<NewPasswordGuard>;

  const createService = createServiceFactory({
    service: NewPasswordGuard,
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [
      MockProvider(Store),
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
});
