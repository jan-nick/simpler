import { LibraryFile, Prisma } from '@prisma/client';
import { Action } from '@simpler/types';
import { AppAbility } from '../casl.factory';

const subjectType = Prisma.ModelName.LibraryFile;

const policyHandlerFactory = (
  ability: AppAbility,
  action: Action,
  libraryFile?: Partial<LibraryFile>
) =>
  libraryFile
    ? ability.can(action, {
        __caslSubjectType__: subjectType,
        ...(libraryFile as LibraryFile),
      })
    : ability.can(action, subjectType);

export const CreateLibraryFilePolicyHandler =
  () => (ability: AppAbility, libraryFile?: Partial<LibraryFile>) =>
    policyHandlerFactory(ability, Action.Create, libraryFile);

export const DeleteLibraryFilePolicyHandler =
  () => (ability: AppAbility, libraryFile?: Partial<LibraryFile>) =>
    policyHandlerFactory(ability, Action.Delete, libraryFile);

export const ReadLibraryFilePolicyHandler =
  () => (ability: AppAbility, libraryFile?: Partial<LibraryFile>) =>
    policyHandlerFactory(ability, Action.Read, libraryFile);

export const UpdateLibraryFilePolicyHandler =
  () => (ability: AppAbility, libraryFile?: Partial<LibraryFile>) =>
    policyHandlerFactory(ability, Action.Update, libraryFile);
