import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  first,
  firstValueFrom,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import { StorageService } from '@simpler/api/storage';
import UUID from 'uuidjs';
import { LibraryFile } from '@prisma/client';
import { AnimationDuration } from '@simpler/types';
import { sum } from '@simpler/utils';
import { AuthState, selectUser } from '@simpler/auth';
import { Store } from '@ngrx/store';
import {
  LibraryFileActions,
  LibraryFileState,
  selectAllLibraryFiles,
  selectDeleteLibraryFilesLoaded,
  selectLoadLibraryFilesError,
  selectLoadLibraryFilesLoading,
} from '@simpler/library-files';
import { compareDesc } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class LibraryUploadService {
  private readonly userId$ = this.store.select(selectUser).pipe(
    filter((user) => !!user),
    map((user) => user?.id as string)
  );

  readonly filesLimit = 12;
  loadFilesCounter = 1;

  readonly files$ = this.userId$.pipe(
    switchMap((userId) =>
      this.store
        .select(selectAllLibraryFiles)
        .pipe(
          map((libraryFiles) =>
            libraryFiles
              .filter((libraryFile) => libraryFile.userId === userId)
              .sort((a, b) => compareDesc(a.createdAt, b.createdAt))
          )
        )
    )
  );

  readonly loadingFiles$ = this.store.select(selectLoadLibraryFilesLoading);
  readonly error$ = this.store.select(selectLoadLibraryFilesError);

  private readonly activeUploadsSource: BehaviorSubject<
    Partial<LibraryFile>[]
  > = new BehaviorSubject<Partial<LibraryFile>[]>([]);
  readonly activeUploads$ = this.activeUploadsSource.asObservable();

  private readonly progressSource: BehaviorSubject<number[]> =
    new BehaviorSubject<number[]>([]);
  readonly progress$ = this.progressSource.pipe(
    map((progress) =>
      progress.map((uploadsProgress) => Math.round(uploadsProgress))
    )
  );
  readonly totalProgress$ = this.progress$.pipe(
    map((uploadsProgress) =>
      uploadsProgress.length
        ? sum(...uploadsProgress) / uploadsProgress.length
        : null
    )
  );
  readonly finishedUpload$ = this.progress$.pipe(
    filter((progress) => progress.some((value) => value === 100)),
    map((progress) => {
      const index = progress.findIndex((value) => value === 100);
      return this.activeUploadsSource.value[index];
    }),
    tap(() => this.loadUserStorage()) // ! Should actually be called when uploads start
  );
  userStorage$!: Observable<number>;

  constructor(
    private readonly storageService: StorageService,
    private readonly store: Store<AuthState & LibraryFileState>
  ) {
    this.initData();
  }

  private async initData() {
    this.loadFiles();
    this.loadUserStorage();
    this.loadUserStorageOnFileDelete();
  }

  private loadUserStorage() {
    this.userStorage$ = combineLatest({
      userId: this.userId$,
      finishedUpload: this.finishedUpload$.pipe(startWith(null)),
    }).pipe(
      switchMap(({ userId }) =>
        this.storageService
          .findUserStorageSize(userId)
          .pipe(shareReplay(1), debounceTime(1000))
      )
    );
  }

  private loadUserStorageOnFileDelete() {
    this.store.select(selectDeleteLibraryFilesLoaded).subscribe(() => {
      this.loadUserStorage();
    });
  }

  loadFiles([skip, take]: [number, number] = [0, this.filesLimit - 1]) {
    this.userId$.pipe(first()).subscribe((userId) => {
      this.store.dispatch(
        LibraryFileActions.loadLibraryFiles({
          args: {
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            skip,
            take,
          },
        })
      );
    });
  }

  // TODO: Buggy behaviour
  loadMoreFiles() {
    const rangeStart = this.loadFilesCounter * this.filesLimit;
    const rangeEnd = rangeStart + this.filesLimit - 1;

    this.loadFilesCounter++;

    this.loadFiles([rangeStart, rangeEnd]);
  }

  updateProgress(upload: Partial<LibraryFile>, uploadProgress: number) {
    this.progress$.pipe(take(1)).subscribe((progress) => {
      const uploads = [...this.activeUploadsSource.value];
      const uploadIndex = uploads.findIndex(({ id }) => id === upload.id);

      progress[uploadIndex] = uploadProgress;

      this.progressSource.next(progress);
    });
  }

  getProgress(upload: Partial<LibraryFile>) {
    return combineLatest([this.activeUploads$, this.progress$]).pipe(
      map(([uploads]) => {
        const index = uploads.findIndex(({ id }) => id === upload.id);

        return this.progressSource.value[index];
      })
    );
  }

  addUploads(uploads: Partial<LibraryFile>[]) {
    this.activeUploadsSource.next([
      ...uploads,
      ...this.activeUploadsSource.value,
    ]);
    this.progressSource.next([
      ...Array(uploads.length).fill(0),
      ...this.progressSource.value,
    ]);
  }

  removeUpload(upload: Partial<LibraryFile>) {
    const index = this.activeUploadsSource.value.findIndex(
      ({ id }) => id === upload.id
    );

    const uploads = [...this.activeUploadsSource.value];
    const progress = [...this.progressSource.value];

    uploads.splice(index, 1);
    progress.splice(index, 1);

    this.activeUploadsSource.next(uploads);
    this.progressSource.next(progress);
  }

  uploadFiles(files: File[], libraryFolderId: string | null) {
    this.userId$.pipe(first()).subscribe((userId) => {
      const uploads = this.nativeFilesToUploads(files, libraryFolderId);

      this.addUploads(uploads);

      uploads.forEach(async (upload, index) => {
        const file = files[index];
        const { id } = upload;

        // TODO: Error handling
        const { storageUrl } = await firstValueFrom(
          this.storageService.uploadLibraryFile(file, { id, userId })
        );

        this.updateProgress(upload, 50);

        this.store.dispatch(
          LibraryFileActions.addLibraryFile({
            libraryFile: {
              id,
              userId,
              libraryFolderId,
              name: file.name,
              url: storageUrl,
              createdAt: new Date(),
              updatedAt: new Date(),
              coverUrl: null,
              isPublic: false,
              isDownloadPublic: false,
            },
          })
        );

        // TODO: Error handling
        await firstValueFrom(timer(AnimationDuration.Long));

        this.updateProgress(upload, 100);
      });
    });
  }

  nativeFilesToUploads(
    files: File[],
    libraryFolderId: string | null
  ): Pick<LibraryFile, 'id' | 'libraryFolderId' | 'name'>[] {
    return files.map(({ name }) => ({
      id: UUID.generate(),
      libraryFolderId,
      name,
    }));
  }
}
