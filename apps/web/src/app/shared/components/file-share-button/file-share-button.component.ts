import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryFile } from '@prisma/client';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '@simpler/auth';
import { FileShareDialogComponent } from '../file-share-dialog/file-share-dialog.component';

@Component({
  selector: 'simpler-file-share-button',
  templateUrl: './file-share-button.component.html',
  styleUrls: ['./file-share-button.component.scss'],
})
export class FileShareButtonComponent {
  @Input() libraryFile: LibraryFile | null | undefined;

  get userIsOwner$() {
    return this.store
      .select(selectUser)
      .pipe(map((user) => !!user && user.id === this.libraryFile?.userId));
  }

  constructor(
    private readonly ngbModal: NgbModal,
    private readonly store: Store
  ) {}

  async openFileShareDialog() {
    const modalRef = this.ngbModal.open(FileShareDialogComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.libraryFile = this.libraryFile;
  }
}
