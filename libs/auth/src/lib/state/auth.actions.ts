import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@prisma/client';
import {
  Auth,
  Credentials,
  ForgotPasswordError,
  LoginError,
  LogoutError,
  ResetPasswordError,
  SignUpError,
} from '@simpler/types';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Init ': props<Partial<Auth>>(),
    'Forgot Password': props<{ email: string }>(),
    'Login ': props<Credentials>(),
    'Logout ': props<Auth>(),
    'Reset Password': props<{ userId: string; password: string }>(),
    'Sign Up': props<Credentials>(),
    'Sync User': props<{ user?: User | null }>(),
  },
});

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    'Forgot Password Failure': props<{ error: ForgotPasswordError }>(),
    'Forgot Password Success': emptyProps(),
    'Login Failure': props<{ error: LoginError }>(),
    'Login Success': props<Auth>(),
    'Logout Failure': props<{ error: LogoutError }>(),
    'Logout Success': emptyProps(),
    'Reset Password Failure': props<{ error: ResetPasswordError }>(),
    'Reset Password Success': emptyProps(),
    'Sign Up Failure': props<{ error: SignUpError }>(),
    'Sign Up Success': props<Auth>(),
  },
});
