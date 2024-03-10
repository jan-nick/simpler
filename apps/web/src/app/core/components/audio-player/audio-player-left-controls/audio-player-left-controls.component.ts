import { Component } from '@angular/core';
import { AudioPlayerService } from '../audio-player.service';
import { LibraryFile } from '@prisma/client';
import { Router } from '@angular/router';

@Component({
  selector: 'simpler-audio-player-left-controls',
  templateUrl: './audio-player-left-controls.component.html',
  styleUrls: ['./audio-player-left-controls.component.scss'],
})
export class AudioPlayerLeftControlsComponent {
  constructor(
    public readonly audioPlayerService: AudioPlayerService,
    private readonly router: Router
  ) {}

  open(libraryFile: LibraryFile) {
    this.router.navigate(['file', libraryFile.id]);
  }
}
