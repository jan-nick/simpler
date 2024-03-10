import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { LibraryFile, Prisma } from '@prisma/client';

export const LibraryFileActions = createActionGroup({
  source: 'Library Files',
  events: {
    'Add Library File': props<{ libraryFile: LibraryFile }>(),
    'Clear Library Files': emptyProps(),
    'Delete Library File': props<{ id: string }>(),
    'Load Library File': props<{ id: string }>(),
    'Load Library Files': props<{ args: Prisma.LibraryFileFindManyArgs }>(),
    'Update Library File': props<{ update: Update<LibraryFile> }>(),
  },
});

export const LibraryFileApiActions = createActionGroup({
  source: 'Library Files Api',
  events: {
    'Add Library File Success': props<{ libraryFile: LibraryFile }>(),
    'Add Library File Failure': props<{ error: unknown }>(),
    'Delete Library File Success': props<{ id: string }>(),
    'Delete Library File Failure': props<{ error: unknown }>(),
    'Load Library File Success': props<{ libraryFile: LibraryFile }>(),
    'Load Library File Failure': props<{ error: unknown }>(),
    'Load Library Files Success': props<{ libraryFiles: LibraryFile[] }>(),
    'Load Library Files Failure': props<{ error: unknown }>(),
    'Update Library File Success': props<{ libraryFile: LibraryFile }>(),
    'Update Library File Failure': props<{ error: unknown }>(),
  },
});
