import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslatePipeMock } from '@simpler/testing';
import { IconButtonComponent, SliderComponent } from '@simpler/ui';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';

import { AudioPlayerRightControlsComponent } from './audio-player-right-controls.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AudioPlayerService } from '../audio-player.service';

describe('AudioPlayerRightControlsComponent', () => {
  let spectator: Spectator<AudioPlayerRightControlsComponent>;

  const createComponent = createComponentFactory({
    component: AudioPlayerRightControlsComponent,
    declarations: [
      MockComponents(IconButtonComponent, SliderComponent),
      TranslatePipeMock,
    ],
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
