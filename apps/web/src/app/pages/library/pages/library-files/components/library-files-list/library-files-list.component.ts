import { Component } from '@angular/core';
import { LibraryFile } from '@prisma/client';
import { defaultOnEnterAnimation } from '@simpler/ui';
import { AudioPlayerService } from '../../../../../../core/components/audio-player/audio-player.service';
import { LibraryFilesService } from '../../library-files.service';

@Component({
  selector: 'simpler-library-files-list',
  templateUrl: './library-files-list.component.html',
  styleUrls: ['./library-files-list.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class LibraryFilesListComponent {
  skeletonItems = Array(this.libraryFilesService.filesLimit);

  constructor(
    public readonly audioPlayerService: AudioPlayerService,
    public readonly libraryFilesService: LibraryFilesService
  ) {}

  onFilePlay(files: LibraryFile[] | null) {
    if (files) {
      this.audioPlayerService.setQueue(files);
    }
  }
}
