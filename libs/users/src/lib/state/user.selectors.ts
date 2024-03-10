import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { map, pipe } from 'rxjs';
import { usersAdapter, UserState } from './user.reducer';

export const userKey = 'user';

export const selectUser = createFeatureSelector<UserState>(userKey);

const { selectIds, selectEntities, selectAll, selectTotal } =
  usersAdapter.getSelectors(selectUser);

export const selectUserIds = selectIds;

export const selectUserEntities = selectEntities;

export const selectAllUsers = selectAll;

export const selectUserTotal = selectTotal;

export const selectUserById = (id: string) =>
  pipe(
    select(selectUserEntities),
    map((users) => users[id])
  );

export const selectLoadUserError = createSelector(
  selectUser,
  (state) => state.loadUserError
);
export const selectLoadUserLoaded = createSelector(
  selectUser,
  (state) => state.loadUserLoaded
);
export const selectLoadUserLoading = createSelector(
  selectUser,
  (state) => state.loadUserLoading
);

export const selectLoadUsersError = createSelector(
  selectUser,
  (state) => state.loadUsersError
);
export const selectLoadUsersLoaded = createSelector(
  selectUser,
  (state) => state.loadUsersLoaded
);
export const selectLoadUsersLoading = createSelector(
  selectUser,
  (state) => state.loadUsersLoading
);
