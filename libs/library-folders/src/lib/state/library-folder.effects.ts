import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LibraryFoldersService } from '@simpler/api/library-folders';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import {
  LibraryFolderActions,
  LibraryFolderApiActions,
} from './library-folder.actions';

@Injectable()
export class LibraryFolderEffects {
  readonly addLibraryFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFolderActions.addLibraryFolder),
      mergeMap((action) =>
        from(this.libraryFoldersService.create(action.libraryFolder)).pipe(
          map((libraryFolder) =>
            LibraryFolderApiActions.addLibraryFolderSuccess({
              libraryFolder,
            })
          ),
          catchError((error) =>
            of(LibraryFolderApiActions.addLibraryFolderFailure({ error }))
          )
        )
      )
    )
  );

  readonly deleteLibraryFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFolderActions.deleteLibraryFolder),
      mergeMap((action) =>
        from(this.libraryFoldersService.delete(action.id)).pipe(
          map(({ id }) =>
            LibraryFolderApiActions.deleteLibraryFolderSuccess({
              id,
            })
          ),
          catchError((error) =>
            of(LibraryFolderApiActions.deleteLibraryFolderFailure({ error }))
          )
        )
      )
    )
  );

  readonly loadLibraryFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFolderActions.loadLibraryFolder),
      mergeMap((action) =>
        this.libraryFoldersService.findOne(action.id).pipe(
          map((libraryFolder) =>
            LibraryFolderApiActions.loadLibraryFolderSuccess({
              libraryFolder,
            })
          ),
          catchError((error) =>
            of(LibraryFolderApiActions.loadLibraryFolderFailure({ error }))
          )
        )
      )
    )
  );

  readonly loadLibraryFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFolderActions.loadLibraryFolders),
      mergeMap((action) =>
        this.libraryFoldersService.findAll(action.args).pipe(
          map((libraryFolders) =>
            LibraryFolderApiActions.loadLibraryFoldersSuccess({
              libraryFolders,
            })
          ),
          catchError((error) =>
            of(LibraryFolderApiActions.loadLibraryFoldersFailure({ error }))
          )
        )
      )
    )
  );

  readonly updateLibraryFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFolderActions.updateLibraryFolder),
      mergeMap(({ update }) =>
        from(
          this.libraryFoldersService.update(update.id as string, update.changes)
        ).pipe(
          map((libraryFolder) =>
            LibraryFolderApiActions.updateLibraryFolderSuccess({
              libraryFolder,
            })
          ),
          catchError((error) =>
            of(LibraryFolderApiActions.updateLibraryFolderFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly libraryFoldersService: LibraryFoldersService
  ) {}
}
