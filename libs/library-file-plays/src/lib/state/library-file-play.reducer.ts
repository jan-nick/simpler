import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { LibraryFilePlay } from '@prisma/client';
import {
  LibraryFilePlayActions,
  LibraryFilePlayApiActions,
} from './library-file-play.actions';

export interface libraryFilePlaystate extends EntityState<LibraryFilePlay> {
  addLibraryFilePlayError: unknown | null;
  addLibraryFilePlayLoaded: boolean;
  addLibraryFilePlayLoading: boolean;

  deleteLibraryFilePlayError: unknown | null;
  deleteLibraryFilePlayLoaded: boolean;
  deleteLibraryFilePlayLoading: boolean;

  loadLibraryFilePlayError: unknown | null;
  loadLibraryFilePlayLoaded: boolean;
  loadLibraryFilePlayLoading: boolean;

  loadlibraryFilePlaysError: unknown | null;
  loadlibraryFilePlaysLoaded: boolean;
  loadlibraryFilePlaysLoading: boolean;
}

export const libraryFilePlaysAdapter = createEntityAdapter<LibraryFilePlay>();

export const initialState: libraryFilePlaystate =
  libraryFilePlaysAdapter.getInitialState({
    addLibraryFilePlayError: null,
    addLibraryFilePlayLoaded: false,
    addLibraryFilePlayLoading: false,

    deleteLibraryFilePlayError: null,
    deleteLibraryFilePlayLoaded: false,
    deleteLibraryFilePlayLoading: false,

    loadLibraryFilePlayError: null,
    loadLibraryFilePlayLoaded: false,
    loadLibraryFilePlayLoading: false,

    loadlibraryFilePlaysError: null,
    loadlibraryFilePlaysLoaded: false,
    loadlibraryFilePlaysLoading: false,
  });

export const libraryFilePlayReducer = createReducer(
  initialState,

  /* Add Play Count */
  on(LibraryFilePlayActions.addLibraryFilePlay, (state, { libraryFilePlay }) => ({
    ...libraryFilePlaysAdapter.addOne(libraryFilePlay, state),
    addLibraryFilePlayLoaded: false,
    addLibraryFilePlayLoading: true,
  })),
  on(LibraryFilePlayApiActions.addLibraryFilePlaySuccess, (state) => ({
    ...state,
    addLibraryFilePlayError: null,
    addLibraryFilePlayLoaded: true,
    addLibraryFilePlayLoading: false,
  })),
  on(LibraryFilePlayApiActions.addLibraryFilePlayFailure, (state, { error }) => ({
    ...state,
    addLibraryFilePlayError: error,
    addLibraryFilePlayLoaded: true,
    addLibraryFilePlayLoading: false,
  })),

  /* Load Play Count */
  on(LibraryFilePlayActions.loadLibraryFilePlay, (state) => ({
    ...state,
    loadLibraryFilePlayLoaded: false,
    loadLibraryFilePlayLoading: true,
  })),
  on(
    LibraryFilePlayApiActions.loadLibraryFilePlaySuccess,
    (state, { libraryFilePlay }) => ({
      ...libraryFilePlaysAdapter.setOne(libraryFilePlay, state),
      loadLibraryFilePlayError: null,
      loadLibraryFilePlayLoaded: true,
      loadLibraryFilePlayLoading: false,
    })
  ),
  on(LibraryFilePlayApiActions.loadLibraryFilePlayFailure, (state, { error }) => ({
    ...state,
    loadLibraryFilePlayError: error,
    loadLibraryFilePlayLoaded: true,
    loadLibraryFilePlayLoading: false,
  })),

  /* Load Play Counts */
  on(LibraryFilePlayActions.loadLibraryFilePlays, (state) => ({
    ...state,
    loadlibraryFilePlaysLoaded: false,
    loadlibraryFilePlaysLoading: true,
  })),
  on(
    LibraryFilePlayApiActions.loadLibraryFilePlaysSuccess,
    (state, { libraryFilePlays }) => ({
      ...libraryFilePlaysAdapter.setMany(libraryFilePlays, state),
      loadlibraryFilePlaysError: null,
      loadlibraryFilePlaysLoaded: true,
      loadlibraryFilePlaysLoading: false,
    })
  ),
  on(LibraryFilePlayApiActions.loadLibraryFilePlaysFailure, (state, { error }) => ({
    ...state,
    loadlibraryFilePlaysError: error,
    loadlibraryFilePlaysLoaded: true,
    loadlibraryFilePlaysLoading: false,
  })),

  on(LibraryFilePlayActions.clearLibraryFilePlays, (state) => {
    return libraryFilePlaysAdapter.removeAll({
      ...state,
    });
  })
);
