import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import {
  FormatSecondsPipe,
  IconButtonComponent,
  RoundPipe,
  SliderComponent,
} from '@simpler/ui';
import { MockComponents, MockModule, MockPipe, MockProvider } from 'ng-mocks';

import { AudioPlayerCenterControlsComponent } from './audio-player-center-controls.component';
import { TranslatePipe } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AudioPlayerService } from '../audio-player.service';

describe('AudioPlayerCenterControlsComponent', () => {
  let spectator: Spectator<AudioPlayerCenterControlsComponent>;

  const createComponent = createComponentFactory({
    component: AudioPlayerCenterControlsComponent,
    declarations: [
      MockComponents(IconButtonComponent, SliderComponent),
      MockPipe(FormatSecondsPipe),
      MockPipe(RoundPipe),
      MockPipe(TranslatePipe, (key, args) => key + JSON.stringify(args)),
    ],
    imports: [MockModule(NgbTooltipModule), MockModule(RouterTestingModule)],
    providers: [MockProvider(AudioPlayerService)],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
