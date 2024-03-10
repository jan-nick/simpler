import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const authKey = 'auth';

export const selectAuth = createFeatureSelector<AuthState>(authKey);

export const selectUser = createSelector(selectAuth, (state) => state.user);

export const selectForgotPasswordError = createSelector(
  selectAuth,
  (state) => state.forgotPasswordError
);
export const selectForgotPasswordLoaded = createSelector(
  selectAuth,
  (state) => state.forgotPasswordLoaded
);
export const selectForgotPasswordLoading = createSelector(
  selectAuth,
  (state) => state.forgotPasswordLoading
);

export const selectLoginError = createSelector(
  selectAuth,
  (state) => state.loginError
);
export const selectLoginLoaded = createSelector(
  selectAuth,
  (state) => state.loginLoaded
);
export const selectLoginLoading = createSelector(
  selectAuth,
  (state) => state.loginLoading
);

export const selectLogoutError = createSelector(
  selectAuth,
  (state) => state.logoutError
);
export const selectLogoutLoaded = createSelector(
  selectAuth,
  (state) => state.logoutLoaded
);
export const selectLogoutLoading = createSelector(
  selectAuth,
  (state) => state.logoutLoading
);

export const selectResetPasswordError = createSelector(
  selectAuth,
  (state) => state.resetPasswordError
);
export const selectResetPasswordLoaded = createSelector(
  selectAuth,
  (state) => state.resetPasswordLoaded
);
export const selectResetPasswordLoading = createSelector(
  selectAuth,
  (state) => state.resetPasswordLoading
);

export const selectSignUpError = createSelector(
  selectAuth,
  (state) => state.signUpError
);
export const selectSignUpLoaded = createSelector(
  selectAuth,
  (state) => state.signUpLoaded
);
export const selectSignUpLoading = createSelector(
  selectAuth,
  (state) => state.signUpLoading
);
