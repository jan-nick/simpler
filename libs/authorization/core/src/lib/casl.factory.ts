import { AbilityBuilder, PureAbility } from '@casl/ability';

import { PrismaQuery, createPrismaAbility } from './models/casl-prisma';
import { LibraryFile, LibraryFolder, LibraryFilePlay, User } from '@prisma/client';
import { Action } from '@simpler/types';
import { Subjects } from '@casl/prisma';

/** A union of subjects to extend the ability beyond just Prisma models */
type ExtendedSubjects = 'all';
export type AppSubjects =
  | Subjects<{
      LibraryFile: LibraryFile;
      LibraryFolder: LibraryFolder;
      LibraryFilePlay: LibraryFilePlay;
      User: User;
    }>
  | ExtendedSubjects;
export type AppAbility = PureAbility<[Action, AppSubjects], PrismaQuery>;

export class CaslFactory {
  async createAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility
    );

    if (user.refreshToken) {
      can(Action.Manage, 'LibraryFile', { userId: user.id });
      can(Action.Read, 'LibraryFile', { isPublic: true });

      can(Action.Manage, 'LibraryFolder', { userId: user.id });

      can(Action.Read, 'LibraryFilePlay', {
        // 'libraryFile.isPublic': true,
      });
      can(Action.Create, 'LibraryFilePlay', {
        userId: user.id,
        NOT: { 'libraryFile.userId': user.id } as any,
        // AND: { libraryFile: { isNot: { userId: user.id } } },
      } as any);

      can(Action.Manage, 'User', { id: user.id });
    }

    return build();
  }
}
