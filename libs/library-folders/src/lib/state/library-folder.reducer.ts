import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { LibraryFolder } from '@prisma/client';
import {
  LibraryFolderActions,
  LibraryFolderApiActions,
} from './library-folder.actions';

export interface LibraryFolderState extends EntityState<LibraryFolder> {
  addLibraryFolderError: unknown | null;
  addLibraryFolderLoaded: boolean;
  addLibraryFolderLoading: boolean;

  deleteLibraryFolderError: unknown | null;
  deleteLibraryFolderLoaded: boolean;
  deleteLibraryFolderLoading: boolean;

  loadLibraryFolderError: unknown | null;
  loadLibraryFolderLoaded: boolean;
  loadLibraryFolderLoading: boolean;

  loadLibraryFoldersError: unknown | null;
  loadLibraryFoldersLoaded: boolean;
  loadLibraryFoldersLoading: boolean;

  updateLibraryFolderError: unknown | null;
  updateLibraryFolderLoaded: boolean;
  updateLibraryFolderLoading: boolean;
}

export const libraryFoldersAdapter = createEntityAdapter<LibraryFolder>();

export const initialState: LibraryFolderState =
  libraryFoldersAdapter.getInitialState({
    addLibraryFolderError: null,
    addLibraryFolderLoaded: false,
    addLibraryFolderLoading: false,

    deleteLibraryFolderError: null,
    deleteLibraryFolderLoaded: false,
    deleteLibraryFolderLoading: false,

    loadLibraryFolderError: null,
    loadLibraryFolderLoaded: false,
    loadLibraryFolderLoading: false,

    loadLibraryFoldersError: null,
    loadLibraryFoldersLoaded: false,
    loadLibraryFoldersLoading: false,

    updateLibraryFolderError: null,
    updateLibraryFolderLoaded: false,
    updateLibraryFolderLoading: false,
  });

export const libraryFolderReducer = createReducer(
  initialState,

  /* Add Library Folder */
  on(LibraryFolderActions.addLibraryFolder, (state, { libraryFolder }) => ({
    ...libraryFoldersAdapter.addOne(libraryFolder, state),
    addLibraryFolderLoaded: false,
    addLibraryFolderLoading: true,
  })),
  on(LibraryFolderApiActions.addLibraryFolderSuccess, (state) => ({
    ...state,
    addLibraryFolderError: null,
    addLibraryFolderLoaded: true,
    addLibraryFolderLoading: false,
  })),
  on(LibraryFolderApiActions.addLibraryFolderFailure, (state, { error }) => ({
    ...state,
    addLibraryFolderError: error,
    addLibraryFolderLoaded: true,
    addLibraryFolderLoading: false,
  })),

  /* Delete Library Folder */
  on(LibraryFolderActions.deleteLibraryFolder, (state, { id }) => ({
    ...libraryFoldersAdapter.removeOne(id, state),
    deleteLibraryFolderLoaded: false,
    deleteLibraryFolderLoading: true,
  })),
  on(LibraryFolderApiActions.deleteLibraryFolderSuccess, (state) => ({
    ...state,
    deleteLibraryFolderError: null,
    deleteLibraryFolderLoaded: true,
    deleteLibraryFolderLoading: false,
  })),
  on(LibraryFolderApiActions.deleteLibraryFolderFailure, (state, { error }) => ({
    ...state,
    deleteLibraryFolderError: error,
    deleteLibraryFolderLoaded: true,
    deleteLibraryFolderLoading: false,
  })),

  /* Load Library Folder */
  on(LibraryFolderActions.loadLibraryFolder, (state) => ({
    ...state,
    loadLibraryFolderLoaded: false,
    loadLibraryFolderLoading: true,
  })),
  on(
    LibraryFolderApiActions.loadLibraryFolderSuccess,
    (state, { libraryFolder }) => ({
      ...libraryFoldersAdapter.setOne(libraryFolder, state),
      loadLibraryFolderError: null,
      loadLibraryFolderLoaded: true,
      loadLibraryFolderLoading: false,
    })
  ),
  on(LibraryFolderApiActions.loadLibraryFolderFailure, (state, { error }) => ({
    ...state,
    loadLibraryFolderError: error,
    loadLibraryFolderLoaded: true,
    loadLibraryFolderLoading: false,
  })),

  /* Load Library Folders */
  on(LibraryFolderActions.loadLibraryFolders, (state) => ({
    ...state,
    loadLibraryFoldersLoaded: false,
    loadLibraryFoldersLoading: true,
  })),
  on(
    LibraryFolderApiActions.loadLibraryFoldersSuccess,
    (state, { libraryFolders }) => ({
      ...libraryFoldersAdapter.setMany(libraryFolders, state),
      loadLibraryFoldersError: null,
      loadLibraryFoldersLoaded: true,
      loadLibraryFoldersLoading: false,
    })
  ),
  on(LibraryFolderApiActions.loadLibraryFoldersFailure, (state, { error }) => ({
    ...state,
    loadLibraryFoldersError: error,
    loadLibraryFoldersLoaded: true,
    loadLibraryFoldersLoading: false,
  })),

  /* Update Library Folder */
  on(LibraryFolderActions.updateLibraryFolder, (state, { update }) => ({
    ...libraryFoldersAdapter.updateOne(update, state),
    updateLibraryFolderLoaded: false,
    updateLibraryFolderLoading: true,
  })),
  on(LibraryFolderApiActions.updateLibraryFolderSuccess, (state) => ({
    ...state,
    updateLibraryFolderError: null,
    updateLibraryFolderLoaded: true,
    updateLibraryFolderLoading: false,
  })),
  on(LibraryFolderApiActions.updateLibraryFolderFailure, (state, { error }) => ({
    ...state,
    updateLibraryFolderError: error,
    updateLibraryFolderLoaded: true,
    updateLibraryFolderLoading: false,
  })),

  on(LibraryFolderActions.clearLibraryFolders, (state) => {
    return libraryFoldersAdapter.removeAll({
      ...state,
    });
  })
);
