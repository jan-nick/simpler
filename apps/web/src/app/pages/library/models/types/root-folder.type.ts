import { LibraryFolder } from '@prisma/client';

export interface RootFolder extends Omit<Partial<LibraryFolder>, 'id'> {
  id: null;
}
