import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@prisma/client';
import { UserActions, UserApiActions } from './user.actions';

export interface UserState extends EntityState<User> {
  addUserError: unknown | null;
  addUserLoaded: boolean;
  addUserLoading: boolean;

  deleteUserError: unknown | null;
  deleteUserLoaded: boolean;
  deleteUserLoading: boolean;

  loadUserError: unknown | null;
  loadUserLoaded: boolean;
  loadUserLoading: boolean;

  loadUsersError: unknown | null;
  loadUsersLoaded: boolean;
  loadUsersLoading: boolean;

  updateUserError: unknown | null;
  updateUserLoaded: boolean;
  updateUserLoading: boolean;
}

export const usersAdapter = createEntityAdapter<User>();

export const initialState: UserState = usersAdapter.getInitialState({
  addUserError: null,
  addUserLoaded: false,
  addUserLoading: false,

  deleteUserError: null,
  deleteUserLoaded: false,
  deleteUserLoading: false,

  loadUserError: null,
  loadUserLoaded: false,
  loadUserLoading: false,

  loadUsersError: null,
  loadUsersLoaded: false,
  loadUsersLoading: false,

  updateUserError: null,
  updateUserLoaded: false,
  updateUserLoading: false,
});

export const userReducer = createReducer(
  initialState,

  /* Add User */
  on(UserActions.addUser, (state, { user }) => ({
    ...usersAdapter.addOne(user, state),
    addUserLoaded: false,
    addUserLoading: true,
  })),
  on(UserApiActions.addUserSuccess, (state) => ({
    ...state,
    addUserError: null,
    addUserLoaded: true,
    addUserLoading: false,
  })),
  on(UserApiActions.addUserFailure, (state, { error }) => ({
    ...state,
    addUserError: error,
    addUserLoaded: true,
    addUserLoading: false,
  })),

  /* Delete User */
  on(UserActions.deleteUser, (state, { id }) => ({
    ...usersAdapter.removeOne(id, state),
    deleteUserLoaded: false,
    deleteUserLoading: true,
  })),
  on(UserApiActions.deleteUserSuccess, (state) => ({
    ...state,
    deleteUserError: null,
    deleteUserLoaded: true,
    deleteUserLoading: false,
  })),
  on(UserApiActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    deleteUserError: error,
    deleteUserLoaded: true,
    deleteUserLoading: false,
  })),

  /* Load User */
  on(UserActions.loadUser, (state) => ({
    ...state,
    loadUserLoaded: false,
    loadUserLoading: true,
  })),
  on(UserApiActions.loadUserSuccess, (state, { user }) => ({
    ...usersAdapter.setOne(user, state),
    loadUserError: null,
    loadUserLoaded: true,
    loadUserLoading: false,
  })),
  on(UserApiActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loadUserError: error,
    loadUserLoaded: true,
    loadUserLoading: false,
  })),

  /* Load Users */
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loadUsersLoaded: false,
    loadUsersLoading: true,
  })),
  on(UserApiActions.loadUsersSuccess, (state, { users }) => ({
    ...usersAdapter.setMany(users, state),
    loadUsersError: null,
    loadUsersLoaded: true,
    loadUsersLoading: false,
  })),
  on(UserApiActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loadUsersError: error,
    loadUsersLoaded: true,
    loadUsersLoading: false,
  })),

  /* Update User */
  on(UserActions.updateUser, (state, { update }) => ({
    ...usersAdapter.updateOne(update, state),
    updateUserLoaded: false,
    updateUserLoading: true,
  })),
  on(UserApiActions.updateUserSuccess, (state) => ({
    ...state,
    updateUserError: null,
    updateUserLoaded: true,
    updateUserLoading: false,
  })),
  on(UserApiActions.updateUserFailure, (state, { error }) => ({
    ...state,
    updateUserError: error,
    updateUserLoaded: true,
    updateUserLoading: false,
  })),

  on(UserActions.clearUsers, (state) => {
    return usersAdapter.removeAll({
      ...state,
    });
  })
);
