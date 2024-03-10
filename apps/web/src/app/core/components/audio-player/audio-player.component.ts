import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { AudioPlayerService } from './audio-player.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AnimationDuration } from '@simpler/types';

@UntilDestroy()
@Component({
  selector: 'simpler-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  animations: [fadeInOnEnterAnimation({ duration: AnimationDuration.Normal })],
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  constructor(public readonly audioPlayerService: AudioPlayerService) {}

  ngOnInit(): void {
    this.audioPlayerService.init();
  }

  ngOnDestroy(): void {
    this.audioPlayerService.destroy();
  }
}
