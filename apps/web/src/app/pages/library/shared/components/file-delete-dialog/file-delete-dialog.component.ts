import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { LibraryFile } from '@prisma/client';
import { LibraryFileActions } from '@simpler/library-files';

@Component({
  selector: 'simpler-file-delete-dialog',
  templateUrl: './file-delete-dialog.component.html',
  styleUrls: ['./file-delete-dialog.component.scss'],
})
export class FileDeleteDialogComponent {
  @Input() libraryFile!: LibraryFile;

  constructor(
    private readonly ngbActiveModal: NgbActiveModal,
    private readonly store: Store
  ) {}

  close() {
    this.ngbActiveModal.close();
  }

  save() {
    this.store.dispatch(
      LibraryFileActions.deleteLibraryFile({
        id: this.libraryFile.id,
      })
    );

    this.ngbActiveModal.close(true);
  }
}
