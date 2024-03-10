import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { LibraryUploadService } from '../../services/library-upload.service';
import { FileUploadModalComponent } from '../file-upload-modal/file-upload-modal.component';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { format } from 'bytes';
import { AnimationDuration } from '@simpler/types';
import { MAX_LIBRARY_SIZE } from '@simpler-constants';

@Component({
  selector: 'simpler-library-sidenav',
  templateUrl: './library-sidenav.component.html',
  styleUrls: ['./library-sidenav.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: AnimationDuration.Normal }),
    fadeOutOnLeaveAnimation({ duration: AnimationDuration.Normal }),
  ],
})
export class LibrarySidenavComponent {
  readonly maxUserStorage = format(MAX_LIBRARY_SIZE, {
    decimalPlaces: 1,
  });

  readonly userStorage$ = this.libraryUploadService.userStorage$.pipe(
    map((userStorage) => format(userStorage, { decimalPlaces: 1 }))
  );
  readonly storageProgress$ = this.libraryUploadService.userStorage$.pipe(
    map((userStorage) => (userStorage * 100) / MAX_LIBRARY_SIZE)
  );

  readonly uploadProgress$ = this.libraryUploadService.totalProgress$;
  readonly activeUploads$ = this.libraryUploadService.activeUploads$;

  constructor(
    private readonly libraryUploadService: LibraryUploadService,
    private readonly ngbModal: NgbModal
  ) {}

  openFileUploadModal() {
    this.ngbModal.open(FileUploadModalComponent, {
      size: 'lg',
    });
  }
}
