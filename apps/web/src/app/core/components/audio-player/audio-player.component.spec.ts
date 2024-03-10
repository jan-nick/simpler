import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponents, MockPipe, MockProvider } from 'ng-mocks';

import { AudioPlayerComponent } from './audio-player.component';
import { AudioPlayerCenterControlsComponent } from './audio-player-center-controls/audio-player-center-controls.component';
import { AudioPlayerLeftControlsComponent } from './audio-player-left-controls/audio-player-left-controls.component';
import { AudioPlayerRightControlsComponent } from './audio-player-right-controls/audio-player-right-controls.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RoundPipe } from '@simpler/ui';
import { AudioPlayerService } from './audio-player.service';

describe('AudioPlayerComponent', () => {
  let spectator: Spectator<AudioPlayerComponent>;
  let component: AudioPlayerComponent;

  const createComponent = createComponentFactory({
    component: AudioPlayerComponent,
    declarations: [
      MockComponents(
        AudioPlayerCenterControlsComponent,
        AudioPlayerLeftControlsComponent,
        AudioPlayerRightControlsComponent
      ),
      MockPipe(RoundPipe),
    ],
    imports: [HttpClientTestingModule],
    providers: [MockProvider(AudioPlayerService)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
