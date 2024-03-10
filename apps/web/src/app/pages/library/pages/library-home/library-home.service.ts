import { Injectable } from '@angular/core';

import {
  combineLatest,
  distinctUntilChanged,
  filter,
  first,
  map,
  Observable,
} from 'rxjs';
import { LibraryFile } from '@prisma/client';
import { Store } from '@ngrx/store';
import { AuthState, selectUser } from '@simpler/auth';
import {
  LibraryFileActions,
  LibraryFileState,
  selectAllLibraryFiles,
  selectLoadLibraryFilesError,
  selectLoadLibraryFilesLoading,
} from '@simpler/library-files';

@Injectable({
  providedIn: 'root',
})
export class LibraryHomeService {
  private readonly userId$ = this.store.select(selectUser).pipe(
    filter((user) => !!user),
    map((user) => user?.id as string)
  );

  readonly listItemsLimit = 8;

  files$!: Observable<LibraryFile[]>;

  readonly loadingFiles$ = this.store.select(selectLoadLibraryFilesLoading);

  readonly loading$ = combineLatest([this.loadingFiles$]).pipe(
    map((values) => values.some((value) => value)),
    distinctUntilChanged()
  );

  readonly error$ = combineLatest([
    this.store.select(selectLoadLibraryFilesError),
  ]).pipe(
    map((errors) => errors.some((error) => !!error)),
    distinctUntilChanged()
  );

  constructor(private readonly store: Store<AuthState & LibraryFileState>) {
    this.loadFiles();
  }

  loadFiles() {
    this.userId$.pipe(first()).subscribe((userId) => {
      this.store.dispatch(
        LibraryFileActions.loadLibraryFiles({
          args: {
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            take: this.listItemsLimit,
          },
        })
      );

      this.files$ = this.store.select(selectAllLibraryFiles).pipe(
        map((libraryFiles) =>
          // ? why filter again
          // * because loadLibraryFiles action does not replace the current collection
          // * but adds/replaces items
          libraryFiles
            .slice(0, this.listItemsLimit)
            .filter((libraryFile) => libraryFile?.userId === userId)
        )
      );
    });
  }
}
