import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User, Prisma } from '@prisma/client';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'Add User': props<{ user: User }>(),
    'Clear Users': emptyProps(),
    'Delete User': props<{ id: string }>(),
    'Load User': props<{ id: string }>(),
    'Load Users': props<{ args: Prisma.UserFindManyArgs }>(),
    'Update User': props<{ update: Update<User> }>(),
  },
});

export const UserApiActions = createActionGroup({
  source: 'Users Api',
  events: {
    'Add User Success': props<{ user: User }>(),
    'Add User Failure': props<{ error: unknown }>(),
    'Delete User Success': props<{ id: string }>(),
    'Delete User Failure': props<{ error: unknown }>(),
    'Load User Success': props<{ user: User }>(),
    'Load User Failure': props<{ error: unknown }>(),
    'Load Users Success': props<{
      users: User[];
    }>(),
    'Load Users Failure': props<{ error: unknown }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: unknown }>(),
  },
});
