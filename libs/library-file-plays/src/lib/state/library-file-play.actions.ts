import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LibraryFilePlay, Prisma } from '@prisma/client';

export const LibraryFilePlayActions = createActionGroup({
  source: 'Library File Plays',
  events: {
    'Add Library File Play': props<{
      libraryFilePlay: LibraryFilePlay;
    }>(),
    'Clear Library File Plays': emptyProps(),
    'Load Library File Play': props<{ id: string }>(),
    'Load Library File Plays': props<{ args: Prisma.LibraryFilePlayFindManyArgs }>(),
  },
});

export const LibraryFilePlayApiActions = createActionGroup({
  source: 'Library File Plays Api',
  events: {
    'Add Library File Play Success': props<{ libraryFilePlay: LibraryFilePlay }>(),
    'Add Library File Play Failure': props<{ error: unknown }>(),
    'Load Library File Play Success': props<{ libraryFilePlay: LibraryFilePlay }>(),
    'Load Library File Play Failure': props<{ error: unknown }>(),
    'Load Library File Plays Success': props<{
      libraryFilePlays: LibraryFilePlay[];
    }>(),
    'Load Library File Plays Failure': props<{ error: unknown }>(),
  },
});
