import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LibraryFilePlaysService } from '@simpler/api/library-file-plays';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { LibraryFilePlayActions, LibraryFilePlayApiActions } from './library-file-play.actions';

@Injectable()
export class LibraryFilePlayEffects {
  readonly addLibraryFilePlay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFilePlayActions.addLibraryFilePlay),
      mergeMap((action) =>
        from(this.libraryFilePlaysService.create(action.libraryFilePlay)).pipe(
          map((libraryFilePlay) =>
            LibraryFilePlayApiActions.addLibraryFilePlaySuccess({
              libraryFilePlay,
            })
          ),
          catchError((error) =>
            of(LibraryFilePlayApiActions.addLibraryFilePlayFailure({ error }))
          )
        )
      )
    )
  );

  readonly loadLibraryFilePlay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFilePlayActions.loadLibraryFilePlay),
      mergeMap((action) =>
        this.libraryFilePlaysService.findOne(action.id).pipe(
          map((libraryFilePlay) =>
            LibraryFilePlayApiActions.loadLibraryFilePlaySuccess({
              libraryFilePlay,
            })
          ),
          catchError((error) =>
            of(LibraryFilePlayApiActions.loadLibraryFilePlayFailure({ error }))
          )
        )
      )
    )
  );

  readonly loadlibraryFilePlays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryFilePlayActions.loadLibraryFilePlays),
      mergeMap((action) =>
        this.libraryFilePlaysService.findAll(action.args).pipe(
          map((libraryFilePlays) =>
            LibraryFilePlayApiActions.loadLibraryFilePlaysSuccess({
              libraryFilePlays,
            })
          ),
          catchError((error) =>
            of(LibraryFilePlayApiActions.loadLibraryFilePlaysFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly libraryFilePlaysService: LibraryFilePlaysService
  ) {}
}
