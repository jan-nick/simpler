import { Component, Input, OnInit } from '@angular/core';
import { delay, find, map, Observable } from 'rxjs';
import { LibraryUploadService } from '../../../services/library-upload.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LibraryFile } from '@prisma/client';
import { AnimationDuration } from '@simpler/types';

@UntilDestroy()
@Component({
  selector: 'simpler-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.scss'],
})
export class UploadItemComponent implements OnInit {
  @Input() upload!: Partial<LibraryFile>;

  progress$!: Observable<number>;
  progressFinished$!: Observable<boolean>;

  constructor(private readonly libraryUploadService: LibraryUploadService) {}

  ngOnInit(): void {
    this.progress$ = this.libraryUploadService.getProgress(this.upload);

    this.progressFinished$ = this.progress$.pipe(
      find((progress) => progress === 100),
      map((progress) => !!progress)
    );

    this.progressFinished$
      .pipe(untilDestroyed(this), delay(AnimationDuration.Long))
      .subscribe(() => {
        this.libraryUploadService.removeUpload(this.upload);
      });
  }
}
