import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState, selectUser } from '@simpler/auth';
import {
  LibraryFileActions,
  LibraryFileState,
  selectAllLibraryFiles,
  selectLoadLibraryFilesError,
  selectLoadLibraryFilesLoading,
} from '@simpler/library-files';
import { compareDesc } from 'date-fns';
import { filter, first, map, switchMap } from 'rxjs';

/*
 TODO: Should be refactored to a store long-term
*/
@Injectable({
  providedIn: 'root',
})
export class LibraryRecentService {
  private readonly userId$ = this.store.select(selectUser).pipe(
    filter((user) => !!user),
    map((user) => user?.id as string)
  );

  readonly filesLimit = 20;
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

  constructor(private readonly store: Store<AuthState & LibraryFileState>) {}

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
}
