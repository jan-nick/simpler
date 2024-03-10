import { RouterTestingModule } from '@angular/router/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { FileCoverComponent, IconComponent } from '@simpler/ui';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';

import { AudioPlayerLeftControlsComponent } from './audio-player-left-controls.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AudioPlayerService } from '../audio-player.service';

describe('AudioPlayerLeftControlsComponent', () => {
  let spectator: Spectator<AudioPlayerLeftControlsComponent>;

  const createComponent = createComponentFactory({
    component: AudioPlayerLeftControlsComponent,
    declarations: [MockComponents(FileCoverComponent, IconComponent)],
    imports: [
      HttpClientTestingModule,
      MockModule(NgbTooltipModule),
      MockModule(RouterTestingModule),
    ],
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
