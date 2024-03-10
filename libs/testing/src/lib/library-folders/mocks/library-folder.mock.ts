import { LibraryFolder } from '@prisma/client';

export const mockLibraryFolder: LibraryFolder = {
  id: 'folder id',
  name: 'folder name',
  parentId: 'folder parent id',
  userId: 'folder user id',
  createdAt: new Date('2020-01-01T12:00:00.200000+00:00'),
  updatedAt: new Date('2020-01-01T12:00:00.200000+00:00'),
};
