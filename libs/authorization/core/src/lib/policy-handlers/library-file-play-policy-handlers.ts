import { LibraryFilePlay, Prisma } from '@prisma/client';
import { Action } from '@simpler/types';
import { AppAbility } from '../casl.factory';

const subjectType = Prisma.ModelName.LibraryFilePlay;

const policyHandlerFactory = (
  ability: AppAbility,
  action: Action,
  libraryFilePlay?: Partial<LibraryFilePlay>
) =>
  libraryFilePlay
    ? ability.can(action, {
        __caslSubjectType__: subjectType,
        ...(libraryFilePlay as LibraryFilePlay),
      })
    : ability.can(action, subjectType);

export const CreateLibraryFilePlayPolicyHandler =
  () => (ability: AppAbility, libraryFilePlay?: Partial<LibraryFilePlay>) =>
    policyHandlerFactory(ability, Action.Create, libraryFilePlay);

export const ReadLibraryFilePlayPolicyHandler =
  () => (ability: AppAbility, libraryFilePlay?: Partial<LibraryFilePlay>) =>
    policyHandlerFactory(ability, Action.Read, libraryFilePlay);
