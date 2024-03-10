import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { map, pipe } from 'rxjs';
import {
  libraryFoldersAdapter,
  LibraryFolderState,
} from './library-folder.reducer';

export const libraryFolderKey = 'libraryFolder';

export const selectLibraryFolder =
  createFeatureSelector<LibraryFolderState>(libraryFolderKey);

const { selectIds, selectEntities, selectAll, selectTotal } =
  libraryFoldersAdapter.getSelectors(selectLibraryFolder);

export const selectLibraryFolderIds = selectIds;

export const selectLibraryFolderEntities = selectEntities;

export const selectAllLibraryFolders = selectAll;

export const selectLibraryFolderTotal = selectTotal;

export const selectLibraryFolderById = (id: string) =>
  pipe(
    select(selectLibraryFolderEntities),
    map((libraryFolders) => libraryFolders[id])
  );

export const selectLoadLibraryFoldersError = createSelector(
  selectLibraryFolder,
  (state) => state.loadLibraryFolderError
);
export const selectLoadLibraryFoldersLoaded = createSelector(
  selectLibraryFolder,
  (state) => state.loadLibraryFolderLoaded
);
export const selectLoadLibraryFoldersLoading = createSelector(
  selectLibraryFolder,
  (state) => state.loadLibraryFolderLoading
);
