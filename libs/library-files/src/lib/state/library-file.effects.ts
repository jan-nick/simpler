import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LibraryFilesService } from '@simpler/api/library-files';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import {
  LibraryFileActions,
  LibraryFileApiActions,
} from './library-file.actions';

@Injectable()
export class LibraryFileEffects {
  readonly addLibraryFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFileActions.addLibraryFile),
      mergeMap((action) =>
        from(this.libraryFilesService.create(action.libraryFile)).pipe(
          map((libraryFile) =>
            LibraryFileApiActions.addLibraryFileSuccess({
              libraryFile,
            })
          ),
          catchError((error) =>
            of(LibraryFileApiActions.addLibraryFileFailure({ error }))
          )
        )
      )
    )
  );

  readonly deleteLibraryFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFileActions.deleteLibraryFile),
      mergeMap((action) =>
        from(this.libraryFilesService.delete(action.id)).pipe(
          map(({ id }) =>
            LibraryFileApiActions.deleteLibraryFileSuccess({
              id,
            })
          ),
          catchError((error) =>
            of(LibraryFileApiActions.deleteLibraryFileFailure({ error }))
          )
        )
      )
    )
  );

  readonly loadLibraryFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFileActions.loadLibraryFile),
      mergeMap((action) =>
        this.libraryFilesService.findOne(action.id).pipe(
          map((libraryFile) =>
            LibraryFileApiActions.loadLibraryFileSuccess({
              libraryFile,
            })
          ),
          catchError((error) =>
            of(LibraryFileApiActions.loadLibraryFileFailure({ error }))
          )
        )
      )
    )
  );

  readonly loadLibraryFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFileActions.loadLibraryFiles),
      mergeMap((action) =>
        this.libraryFilesService.findAll(action.args).pipe(
          map((libraryFiles) =>
            LibraryFileApiActions.loadLibraryFilesSuccess({
              libraryFiles,
            })
          ),
          catchError((error) =>
            of(LibraryFileApiActions.loadLibraryFilesFailure({ error }))
          )
        )
      )
    )
  );

  readonly updateLibraryFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFileActions.updateLibraryFile),
      mergeMap(({ update }) =>
        from(
          this.libraryFilesService.update(update.id as string, update.changes)
        ).pipe(
          map((libraryFile) =>
            LibraryFileApiActions.updateLibraryFileSuccess({ libraryFile })
          ),
          catchError((error) =>
            of(LibraryFileApiActions.updateLibraryFileFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly libraryFilesService: LibraryFilesService
  ) {}
}
