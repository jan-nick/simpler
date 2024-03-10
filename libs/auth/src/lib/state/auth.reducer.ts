import { createReducer, on } from '@ngrx/store';
import { User } from '@prisma/client';
import {
  ForgotPasswordError,
  LoginError,
  LogoutError,
  ResetPasswordError,
  SignUpError,
} from '@simpler/types';
import { AuthActions, AuthApiActions } from './auth.actions';

export interface AuthState {
  accessToken: string | null | undefined;
  user: User | null | undefined;

  forgotPasswordError: ForgotPasswordError | null;
  forgotPasswordLoaded: boolean;
  forgotPasswordLoading: boolean;

  loginError: LoginError | null;
  loginLoaded: boolean;
  loginLoading: boolean;

  logoutError: LogoutError | null;
  logoutLoaded: boolean;
  logoutLoading: boolean;

  resetPasswordError: ResetPasswordError | null;
  resetPasswordLoaded: boolean;
  resetPasswordLoading: boolean;

  signUpError: SignUpError | null;
  signUpLoaded: boolean;
  signUpLoading: boolean;
}

export const initialState: AuthState = {
  accessToken: null,
  user: null,

  forgotPasswordError: null,
  forgotPasswordLoaded: false,
  forgotPasswordLoading: false,

  loginError: null,
  loginLoaded: false,
  loginLoading: false,

  logoutError: null,
  logoutLoaded: false,
  logoutLoading: false,

  resetPasswordError: null,
  resetPasswordLoaded: false,
  resetPasswordLoading: false,

  signUpError: null,
  signUpLoaded: false,
  signUpLoading: false,
} as const;

export const authReducer = createReducer(
  initialState,

  on(AuthActions.init, (state, { accessToken, user }) => ({
    ...state,
    accessToken,
    user,
  })),
  on(AuthActions.syncUser, (state, { user }) => ({
    ...state,
    user,
  })),

  /* Forgot Password */
  on(AuthActions.forgotPassword, (state) => ({
    ...state,
    forgotPasswordLoaded: false,
    forgotPasswordLoading: true,
  })),
  on(AuthApiActions.forgotPasswordFailure, (state, { error }) => ({
    ...state,
    forgotPasswordError: error,
    forgotPasswordLoaded: true,
    forgotPasswordLoading: false,
  })),
  on(AuthApiActions.forgotPasswordSuccess, (state) => ({
    ...state,
    error: null,
    forgotPasswordError: null,
    forgotPasswordLoaded: true,
    forgotPasswordLoading: false,
  })),

  /* Login */
  on(AuthActions.login, (state) => ({
    ...state,
    loginLoaded: false,
    loginLoading: true,
  })),
  on(AuthApiActions.loginFailure, (state, { error }) => ({
    ...state,
    loginError: error,
    loginLoaded: true,
    loginLoading: false,
  })),
  on(AuthApiActions.loginSuccess, (state, { accessToken, user }) => ({
    ...state,
    accessToken,
    user,
    error: null,
    loginError: null,
    loginLoaded: true,
    loginLoading: false,
  })),

  /* Logout */
  on(AuthActions.logout, (state) => ({
    ...state,
    logoutLoaded: false,
    logoutLoading: true,
  })),
  on(AuthApiActions.logoutFailure, (state, { error }) => ({
    ...state,
    logoutError: error,
    logoutLoaded: true,
    logoutLoading: false,
  })),
  on(AuthApiActions.logoutSuccess, (state) => ({
    ...state,
    accessToken: null,
    user: null,
    error: null,
    logoutError: null,
    logoutLoaded: true,
    logoutLoading: false,
  })),

  /* Reset Password */
  on(AuthActions.resetPassword, (state) => ({
    ...state,
    resetPasswordLoaded: false,
    resetPasswordLoading: true,
  })),
  on(AuthApiActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    resetPasswordError: error,
    resetPasswordLoaded: true,
    resetPasswordLoading: false,
  })),
  on(AuthApiActions.resetPasswordSuccess, (state) => ({
    ...state,
    error: null,
    resetPasswordError: null,
    resetPasswordLoaded: true,
    resetPasswordLoading: false,
  })),

  /* Sign Up */
  on(AuthActions.signUp, (state) => ({
    ...state,
    signUpLoaded: false,
    signUpLoading: true,
  })),
  on(AuthApiActions.signUpFailure, (state, { error }) => ({
    ...state,
    signUpError: error,
    signUpLoaded: true,
    signUpLoading: false,
  })),
  on(AuthApiActions.signUpSuccess, (state, { accessToken, user }) => ({
    ...state,
    accessToken,
    user,
    error: null,
    signUpError: null,
    signUpLoaded: true,
    signUpLoading: false,
  }))
);
