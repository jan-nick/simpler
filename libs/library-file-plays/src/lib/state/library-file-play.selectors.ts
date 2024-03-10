import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { map, pipe } from 'rxjs';
import { libraryFilePlaysAdapter, libraryFilePlaystate } from './library-file-play.reducer';

export const libraryFilePlayKey = 'libraryFilePlay';

export const selectLibraryFilePlay =
  createFeatureSelector<libraryFilePlaystate>(libraryFilePlayKey);

const { selectIds, selectEntities, selectAll, selectTotal } =
  libraryFilePlaysAdapter.getSelectors(selectLibraryFilePlay);

export const selectLibraryFilePlayIds = selectIds;

export const selectLibraryFilePlayEntities = selectEntities;

export const selectAlllibraryFilePlays = selectAll;

export const selectLibraryFilePlayTotal = selectTotal;

export const selectlibraryFilePlaysByLibraryFileId = (libraryFileId: string) =>
  pipe(
    select(selectAlllibraryFilePlays),
    map((libraryFilePlays) =>
      libraryFilePlays.filter(
        (libraryFilePlay) => libraryFilePlay.libraryFileId === libraryFileId
      )
    )
  );

export const selectLoadlibraryFilePlaysError = createSelector(
  selectLibraryFilePlay,
  (state) => state.loadLibraryFilePlayError
);
export const selectLoadlibraryFilePlaysLoaded = createSelector(
  selectLibraryFilePlay,
  (state) => state.loadLibraryFilePlayLoaded
);
export const selectLoadlibraryFilePlaysLoading = createSelector(
  selectLibraryFilePlay,
  (state) => state.loadLibraryFilePlayLoading
);
