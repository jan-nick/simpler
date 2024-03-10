import { Component } from '@angular/core';
import { AudioPlayerService } from '../../../../../../core/components/audio-player/audio-player.service';
import { LibraryHomeService } from '../../library-home.service';
import { LibraryFile } from '@prisma/client';
import { defaultOnEnterAnimation } from '@simpler/ui';

@Component({
  selector: 'simpler-library-home-files-list',
  templateUrl: './library-home-files-list.component.html',
  styleUrls: ['./library-home-files-list.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class LibraryHomeFilesListComponent {
  readonly skeletonItems = Array(this.libraryHomeService.listItemsLimit);

  constructor(
    private readonly audioPlayerService: AudioPlayerService,
    public readonly libraryHomeService: LibraryHomeService
  ) {}

  onFilePlay(files: LibraryFile[] | null) {
    if (files) {
      this.audioPlayerService.setQueue(files);
    }
  }
}
