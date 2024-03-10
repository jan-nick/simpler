import { Component } from '@angular/core';
import { AudioPlayerService } from '../audio-player.service';

@Component({
  selector: 'simpler-audio-player-center-controls',
  templateUrl: './audio-player-center-controls.component.html',
  styleUrls: ['./audio-player-center-controls.component.scss'],
})
export class AudioPlayerCenterControlsComponent {
  constructor(public readonly audioPlayerService: AudioPlayerService) {}
}
