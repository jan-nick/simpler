import { HttpClient } from '@angular/common/http';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';

import { UsersService } from './users.service';

describe('ApiService', () => {
  let spectator: SpectatorHttp<UsersService>;

  const createHttp = createHttpFactory({
    service: UsersService,
    providers: [MockProvider(HttpClient)],
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});
