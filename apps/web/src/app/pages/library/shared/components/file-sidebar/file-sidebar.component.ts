import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveOffcanvas, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { StorageService } from '@simpler/api/storage';
import { selectUser } from '@simpler/auth';
import {
  LibraryFileActions,
  selectLibraryFileEntities,
} from '@simpler/library-files';
import { format } from 'bytes';
import { firstValueFrom, map, of, shareReplay, switchMap } from 'rxjs';
import { AudioPlayerService } from '../../../../../core/components/audio-player/audio-player.service';
import { FileDeleteDialogComponent } from '../file-delete-dialog/file-delete-dialog.component';

@Component({
  selector: 'simpler-file-sidebar',
  templateUrl: './file-sidebar.component.html',
  styleUrls: ['./file-sidebar.component.scss'],
})
export class FileSidebarComponent {
  libraryFileId!: string;
  readonly libraryFile$ = this.store
    .select(selectLibraryFileEntities)
    .pipe(map((libraryFiles) => libraryFiles[this.libraryFileId]));

  readonly isUserLibrary$ = this.libraryFile$.pipe(
    switchMap((libraryFile) =>
      this.store
        .select(selectUser)
        .pipe(map((user) => user && libraryFile && user.id === libraryFile.id))
    )
  );
  readonly signedUrl$ = this.libraryFile$.pipe(
    switchMap((libraryFile) =>
      libraryFile
        ? this.storageService.getSignedUrl(libraryFile?.url)
        : of(null)
    ),
    shareReplay()
  );
  readonly fileSize$ = this.signedUrl$.pipe(
    switchMap((signedUrl) =>
      signedUrl
        ? this.httpClient.get(signedUrl, { responseType: 'arraybuffer' })
        : of(null)
    ),
    map((arraybuffer) => arraybuffer && format(new Blob([arraybuffer]).size))
  );
  readonly ACCEPTED_COVER_FILE_TYPES = ['image/jpeg'];

  constructor(
    private readonly audioPlayerService: AudioPlayerService,
    private readonly httpClient: HttpClient,
    private readonly ngbActiveOffcanvas: NgbActiveOffcanvas,
    private readonly ngbModal: NgbModal,
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly store: Store
  ) {}

  async play() {
    const file = await firstValueFrom(this.libraryFile$);
    if (!file) return;

    this.audioPlayerService.play({ file });
  }

  close() {
    this.router.navigate([], { queryParams: {} }); // refresh without queryParams
    this.ngbActiveOffcanvas.close();
  }

  async updateName($event: any) {
    const file = await firstValueFrom(this.libraryFile$);
    const name = $event.target?.value;
    if (!file || !name || name === file.name) return;

    this.store.dispatch(
      LibraryFileActions.updateLibraryFile({
        update: { id: file.id, changes: { name } },
      })
    );
  }

  async onCoverFileSelect($event: Event) {
    const target = $event.target as HTMLInputElement;
    const coverFile = (target.files && Array.from(target.files))?.at(0);
    const libraryFile = await firstValueFrom(this.libraryFile$);

    if (coverFile && libraryFile) {
      const { storageUrl } = await firstValueFrom(
        this.storageService.uploadLibraryFileCover(coverFile, libraryFile)
      );
      this.store.dispatch(
        LibraryFileActions.updateLibraryFile({
          update: { id: libraryFile.id, changes: { coverUrl: storageUrl } },
        })
      );
    }
  }

  async openFileDeleteDialog() {
    const file = await firstValueFrom(this.libraryFile$);
    const modalRef = this.ngbModal.open(FileDeleteDialogComponent);
    modalRef.componentInstance.libraryFile = file;

    const hasConfirmed = await modalRef.result;
    if (hasConfirmed) {
      this.close();
    }
  }
}
