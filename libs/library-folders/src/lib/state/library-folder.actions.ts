import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { LibraryFolder, Prisma } from '@prisma/client';

export const LibraryFolderActions = createActionGroup({
  source: 'Library Folders',
  events: {
    'Add Library Folder': props<{ libraryFolder: LibraryFolder }>(),
    'Clear Library Folders': emptyProps(),
    'Delete Library Folder': props<{ id: string }>(),
    'Load Library Folder': props<{ id: string }>(),
    'Load Library Folders': props<{ args: Prisma.LibraryFolderFindManyArgs }>(),
    'Update Library Folder': props<{ update: Update<LibraryFolder> }>(),
  },
});

export const LibraryFolderApiActions = createActionGroup({
  source: 'Library Folders Api',
  events: {
    'Add Library Folder Success': props<{ libraryFolder: LibraryFolder }>(),
    'Add Library Folder Failure': props<{ error: unknown }>(),
    'Delete Library Folder Success': props<{ id: string }>(),
    'Delete Library Folder Failure': props<{ error: unknown }>(),
    'Load Library Folder Success': props<{ libraryFolder: LibraryFolder }>(),
    'Load Library Folder Failure': props<{ error: unknown }>(),
    'Load Library Folders Success': props<{
      libraryFolders: LibraryFolder[];
    }>(),
    'Load Library Folders Failure': props<{ error: unknown }>(),
    'Update Library Folder Success': props<{ libraryFolder: LibraryFolder }>(),
    'Update Library Folder Failure': props<{ error: unknown }>(),
  },
});
