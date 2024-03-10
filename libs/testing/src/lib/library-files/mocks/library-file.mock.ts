import { LibraryFile } from '@prisma/client';

export const mockLibraryFile: LibraryFile = {
  id: 'file id',
  name: 'file name',
  libraryFolderId: 'file parent id',
  userId: 'file user id',
  url: 'file storage path',
  coverUrl: 'file cover url',
  createdAt: new Date('2020-01-01T12:00:00.200000+00:00'),
  updatedAt: new Date('2020-01-01T12:00:00.200000+00:00'),
  isDownloadPublic: false,
  isPublic: false,
};
