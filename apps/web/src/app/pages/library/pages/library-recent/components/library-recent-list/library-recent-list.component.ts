import { Component } from '@angular/core';
import { LibraryFile } from '@prisma/client';
import { defaultOnEnterAnimation } from '@simpler/ui';
import { AudioPlayerService } from '../../../../../../core/components/audio-player/audio-player.service';
import { LibraryRecentService } from '../../library-recent.service';

@Component({
  selector: 'simpler-library-recent-list',
  templateUrl: './library-recent-list.component.html',
  styleUrls: ['./library-recent-list.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class LibraryRecentListComponent {
  skeletonItems = Array(this.libraryRecentService.filesLimit);

  private itemsAfterScrollEnd!: LibraryFile[] | null;

  constructor(
    public readonly audioPlayerService: AudioPlayerService,
    public readonly libraryRecentService: LibraryRecentService
  ) {}

  onScrollEnd(files: LibraryFile[] | null) {
    if (files && files?.length !== this.itemsAfterScrollEnd?.length) {
      this.libraryRecentService.loadMoreFiles();
    }

    this.itemsAfterScrollEnd = files;
  }

  onFilePlay(files: LibraryFile[] | null) {
    if (files) {
      this.audioPlayerService.setQueue(files);
    }
  }
}
