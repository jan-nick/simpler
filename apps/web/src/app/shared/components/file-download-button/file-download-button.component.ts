import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LibraryFile } from '@prisma/client';
import { StorageService } from '@simpler/api/storage';
import { selectUser } from '@simpler/auth';
import { LibraryFileUtilityService } from '@simpler/library-files';
import { firstValueFrom, map, of } from 'rxjs';

@Component({
  selector: 'simpler-file-download-button',
  templateUrl: './file-download-button.component.html',
  styleUrls: ['./file-download-button.component.scss'],
})
export class FileDownloadButtonComponent implements OnInit {
  @Input() libraryFile: LibraryFile | null | undefined;
  @Input() signedUrl: string | null | undefined;

  get userIsOwner$() {
    return this.store
      .select(selectUser)
      .pipe(map((user) => !!user && user.id === this.libraryFile?.userId));
  }
  
  get signedUrl$() {
    return this.signedUrl
      ? of(this.signedUrl)
      : this.libraryFile
      ? this.storageService.getSignedUrl(this.libraryFile?.url)
      : of();
  }

  downloading = false;

  constructor(
    private readonly libraryFileUtilityService: LibraryFileUtilityService,
    private readonly storageService: StorageService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {}

  async downloadFile() {
    if (this.libraryFile) {
      this.downloading = true;

      const signedUrl = await firstValueFrom(this.signedUrl$);

      if (this.libraryFile && signedUrl) {
        await firstValueFrom(
          this.libraryFileUtilityService.downloadFile(
            signedUrl,
            this.libraryFile.name
          )
        );
      }

      this.downloading = false;
    }
  }
}
