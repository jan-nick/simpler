import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { libraryFilesAdapter, LibraryFileState } from './library-file.reducer';
import { map, pipe } from 'rxjs';

export const libraryFileKey = 'libraryFile';

export const selectLibraryFile =
  createFeatureSelector<LibraryFileState>(libraryFileKey);

const { selectIds, selectEntities, selectAll, selectTotal } =
  libraryFilesAdapter.getSelectors(selectLibraryFile);

export const selectLibraryFileIds = selectIds;

export const selectLibraryFileEntities = selectEntities;

export const selectLibraryFileById = (id: string) =>
  pipe(
    select(selectLibraryFileEntities),
    map((libraryFiles) => libraryFiles[id])
  );

export const selectAllLibraryFiles = selectAll;

export const selectLibraryFileTotal = selectTotal;

export const selectLoadLibraryFileError = createSelector(
  selectLibraryFile,
  (state) => state.loadLibraryFileError
);
export const selectLoadLibraryFileLoaded = createSelector(
  selectLibraryFile,
  (state) => state.loadLibraryFileLoaded
);
export const selectLoadLibraryFileLoading = createSelector(
  selectLibraryFile,
  (state) => state.loadLibraryFileLoading
);

export const selectLoadLibraryFilesError = createSelector(
  selectLibraryFile,
  (state) => state.loadLibraryFilesError
);
export const selectLoadLibraryFilesLoaded = createSelector(
  selectLibraryFile,
  (state) => state.loadLibraryFilesLoaded
);
export const selectLoadLibraryFilesLoading = createSelector(
  selectLibraryFile,
  (state) => state.loadLibraryFilesLoading
);

export const selectDeleteLibraryFilesError = createSelector(
  selectLibraryFile,
  (state) => state.deleteLibraryFileError
);
export const selectDeleteLibraryFilesLoaded = createSelector(
  selectLibraryFile,
  (state) => state.deleteLibraryFileLoaded
);
export const selectDeleteLibraryFilesLoading = createSelector(
  selectLibraryFile,
  (state) => state.deleteLibraryFileLoading
);
