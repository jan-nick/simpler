import { Component, Input, OnInit } from '@angular/core';
import { LibraryFile, LibraryFilePlay, User } from '@prisma/client';
import { AudioPlayerService } from '../../../../core/components/audio-player/audio-player.service';
import { map, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'simpler-file-detail-audio-player',
  templateUrl: './file-detail-audio-player.component.html',
  styleUrls: ['./file-detail-audio-player.component.scss'],
})
export class FileDetailAudioPlayerComponent implements OnInit {
  @Input() file: LibraryFile | undefined | null;
  @Input() libraryFilePlays: LibraryFilePlay[] | undefined | null;
  @Input() signedCoverUrl: string | undefined | null;
  @Input() owner: User | undefined | null;
  @Input() user: User | undefined | null;

  isActive$ = of(false);

  get userIsOwner() {
    return !!this.user && this.user.id === this.owner?.id;
  }

  constructor(public readonly audioPlayerService: AudioPlayerService) {}

  ngOnInit(): void {
    this.isActive$ = this.audioPlayerService.activeFile$.pipe(
      untilDestroyed(this),
      map((activeFile) => !!activeFile && activeFile.id === this.file?.id)
    );
  }
}
