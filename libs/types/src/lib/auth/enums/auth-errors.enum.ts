export enum ForgotPasswordError {
  UserNotFound = 'user-not-found',
}

export enum LoginError {
  InvalidCredentials = 'invalid-credentials',
  UserNotFound = 'user-not-found',
}

export enum LogoutError {}

export enum RefreshError {
  MissingToken = 'missing-token',
}

export enum ResetPasswordError {}

export enum SignUpError {
  EmailTaken = 'email-taken',
}

export enum UpdateUserError {}

export const AuthErrors = {
  ...ForgotPasswordError,
  ...LoginError,
  ...RefreshError,
  ...ResetPasswordError,
  ...SignUpError,
  ...UpdateUserError,
};

export type AuthError =
  | ForgotPasswordError
  | LoginError
  | RefreshError
  | ResetPasswordError
  | SignUpError
  | UpdateUserError;
