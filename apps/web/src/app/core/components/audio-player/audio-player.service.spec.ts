import { AudioPlayerService } from './audio-player.service';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { userMockFactory } from '@simpler/testing';
import { selectUser } from '@simpler/auth';

describe('AudioPlayerService', () => {
  let spectator: SpectatorService<AudioPlayerService>;

  const createService = createServiceFactory({
    service: AudioPlayerService,
    imports: [HttpClientTestingModule],
    providers: [
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
