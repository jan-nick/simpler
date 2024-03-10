import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { LibraryFile } from '@prisma/client';
import {
  LibraryFileActions,
  LibraryFileApiActions,
} from './library-file.actions';

export interface LibraryFileState extends EntityState<LibraryFile> {
  addLibraryFileError: unknown | null;
  addLibraryFileLoaded: boolean;
  addLibraryFileLoading: boolean;

  deleteLibraryFileError: unknown | null;
  deleteLibraryFileLoaded: boolean;
  deleteLibraryFileLoading: boolean;

  loadLibraryFileError: unknown | null;
  loadLibraryFileLoaded: boolean;
  loadLibraryFileLoading: boolean;

  loadLibraryFilesError: unknown | null;
  loadLibraryFilesLoaded: boolean;
  loadLibraryFilesLoading: boolean;

  updateLibraryFileError: unknown | null;
  updateLibraryFileLoaded: boolean;
  updateLibraryFileLoading: boolean;
}

export const libraryFilesAdapter = createEntityAdapter<LibraryFile>();

export const initialState: LibraryFileState =
  libraryFilesAdapter.getInitialState({
    addLibraryFileError: null,
    addLibraryFileLoaded: false,
    addLibraryFileLoading: false,

    deleteLibraryFileError: null,
    deleteLibraryFileLoaded: false,
    deleteLibraryFileLoading: false,

    loadLibraryFileError: null,
    loadLibraryFileLoaded: false,
    loadLibraryFileLoading: false,

    loadLibraryFilesError: null,
    loadLibraryFilesLoaded: false,
    loadLibraryFilesLoading: false,

    updateLibraryFileError: null,
    updateLibraryFileLoaded: false,
    updateLibraryFileLoading: false,
  });

export const libraryFileReducer = createReducer(
  initialState,

  /* Add Library File */
  on(LibraryFileActions.addLibraryFile, (state, { libraryFile }) => ({
    ...libraryFilesAdapter.addOne(libraryFile, state),
    addLibraryFileLoaded: false,
    addLibraryFileLoading: true,
  })),
  on(LibraryFileApiActions.addLibraryFileSuccess, (state) => ({
    ...state,
    addLibraryFileError: null,
    addLibraryFileLoaded: true,
    addLibraryFileLoading: false,
  })),
  on(LibraryFileApiActions.addLibraryFileFailure, (state, { error }) => ({
    ...state,
    addLibraryFileError: error,
    addLibraryFileLoaded: true,
    addLibraryFileLoading: false,
  })),

  /* Delete Library File */
  on(LibraryFileActions.deleteLibraryFile, (state, { id }) => ({
    ...libraryFilesAdapter.removeOne(id, state),
    deleteLibraryFileLoaded: false,
    deleteLibraryFileLoading: true,
  })),
  on(LibraryFileApiActions.deleteLibraryFileSuccess, (state) => ({
    ...state,
    deleteLibraryFileError: null,
    deleteLibraryFileLoaded: true,
    deleteLibraryFileLoading: false,
  })),
  on(LibraryFileApiActions.deleteLibraryFileFailure, (state, { error }) => ({
    ...state,
    deleteLibraryFileError: error,
    deleteLibraryFileLoaded: true,
    deleteLibraryFileLoading: false,
  })),

  /* Load Library File */
  on(LibraryFileActions.loadLibraryFile, (state) => ({
    ...state,
    loadLibraryFileLoaded: false,
    loadLibraryFileLoading: true,
  })),
  on(
    LibraryFileApiActions.loadLibraryFileSuccess,
    (state, { libraryFile }) => ({
      ...libraryFilesAdapter.setOne(libraryFile, state),
      loadLibraryFileError: null,
      loadLibraryFileLoaded: true,
      loadLibraryFileLoading: false,
    })
  ),
  on(LibraryFileApiActions.loadLibraryFileFailure, (state, { error }) => ({
    ...state,
    loadLibraryFileError: error,
    loadLibraryFileLoaded: true,
    loadLibraryFileLoading: false,
  })),

  /* Load Library Files */
  on(LibraryFileActions.loadLibraryFiles, (state) => ({
    ...state,
    loadLibraryFilesLoaded: false,
    loadLibraryFilesLoading: true,
  })),
  on(
    LibraryFileApiActions.loadLibraryFilesSuccess,
    (state, { libraryFiles }) => ({
      ...libraryFilesAdapter.setMany(libraryFiles, state),
      loadLibraryFilesError: null,
      loadLibraryFilesLoaded: true,
      loadLibraryFilesLoading: false,
    })
  ),
  on(LibraryFileApiActions.loadLibraryFilesFailure, (state, { error }) => ({
    ...state,
    loadLibraryFilesError: error,
    loadLibraryFilesLoaded: true,
    loadLibraryFilesLoading: false,
  })),

  /* Update Library File */
  on(LibraryFileActions.updateLibraryFile, (state, { update }) => ({
    ...libraryFilesAdapter.updateOne(update, state),
    updateLibraryFileLoaded: false,
    updateLibraryFileLoading: true,
  })),
  on(LibraryFileApiActions.updateLibraryFileSuccess, (state) => ({
    ...state,
    updateLibraryFileError: null,
    updateLibraryFileLoaded: true,
    updateLibraryFileLoading: false,
  })),
  on(LibraryFileApiActions.updateLibraryFileFailure, (state, { error }) => ({
    ...state,
    updateLibraryFileError: error,
    updateLibraryFileLoaded: true,
    updateLibraryFileLoading: false,
  })),

  on(LibraryFileActions.clearLibraryFiles, (state) => {
    return libraryFilesAdapter.removeAll({
      ...state,
    });
  })
);
