import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { LibraryFile } from '@prisma/client';
import { environment } from '@simpler-env';
import { selectUser } from '@simpler/auth';
import { LibraryFileActions } from '@simpler/library-files';
import { map } from 'rxjs';

@Component({
  selector: 'simpler-file-share-dialog',
  templateUrl: './file-share-dialog.component.html',
  styleUrls: ['./file-share-dialog.component.scss'],
})
export class FileShareDialogComponent {
  @Input() libraryFile!: LibraryFile;

  get libraryFileLink() {
    return `${environment.frontendUrl}/file/${this.libraryFile.id}`;
  }

  get userIsOwner$() {
    return this.store
      .select(selectUser)
      .pipe(map((user) => !!user && user.id === this.libraryFile?.userId));
  }

  constructor(
    private readonly ngbActiveModal: NgbActiveModal,
    private readonly store: Store
  ) {}

  close() {
    this.ngbActiveModal.close();
  }

  setIsPublic() {
    this.store.dispatch(
      LibraryFileActions.updateLibraryFile({
        update: {
          id: this.libraryFile.id,
          changes: { isPublic: !this.libraryFile.isPublic },
        },
      })
    );
  }

  setIsDownloadPublic() {
    this.store.dispatch(
      LibraryFileActions.updateLibraryFile({
        update: {
          id: this.libraryFile.id,
          changes: { isDownloadPublic: !this.libraryFile.isDownloadPublic },
        },
      })
    );
  }
}
