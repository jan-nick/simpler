import { Component } from '@angular/core';
import { LibraryFile } from '@prisma/client';
import { defaultOnEnterAnimation } from '@simpler/ui';

import { LibraryUploadService } from '../../../services/library-upload.service';

@Component({
  selector: 'simpler-completed-file-uploads',
  templateUrl: './completed-file-uploads.component.html',
  styleUrls: ['./completed-file-uploads.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class CompletedFileUploadsComponent {
  skeletonItems = Array(this.libraryUploadService.filesLimit);

  private itemsAfterScrollEnd!: LibraryFile[] | null;

  constructor(public readonly libraryUploadService: LibraryUploadService) {}

  onScrollEnd(files: LibraryFile[] | null) {
    if (files && files?.length !== this.itemsAfterScrollEnd?.length) {
      this.libraryUploadService.loadMoreFiles();
    }

    this.itemsAfterScrollEnd = files;
  }
}
