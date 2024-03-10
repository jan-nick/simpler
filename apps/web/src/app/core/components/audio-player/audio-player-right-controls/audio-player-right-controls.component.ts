import { Component } from '@angular/core';
import { AudioPlayerService } from '../audio-player.service';

@Component({
  selector: 'simpler-audio-player-right-controls',
  templateUrl: './audio-player-right-controls.component.html',
  styleUrls: ['./audio-player-right-controls.component.scss'],
})
export class AudioPlayerRightControlsComponent {
  constructor(public readonly audioPlayerService: AudioPlayerService) {}
}
