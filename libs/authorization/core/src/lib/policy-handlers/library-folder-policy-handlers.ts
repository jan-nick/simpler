import { LibraryFolder, Prisma } from '@prisma/client';
import { Action } from '@simpler/types';
import { AppAbility } from '../casl.factory';

const subjectType = Prisma.ModelName.LibraryFolder;

const policyHandlerFactory = (
  ability: AppAbility,
  action: Action,
  libraryFolder?: Partial<LibraryFolder>
) =>
  libraryFolder
    ? ability.can(action, {
        __caslSubjectType__: subjectType,
        ...(libraryFolder as LibraryFolder),
      })
    : ability.can(action, subjectType);

export const CreateLibraryFolderPolicyHandler =
  () => (ability: AppAbility, libraryFolder?: Partial<LibraryFolder>) =>
    policyHandlerFactory(ability, Action.Create, libraryFolder);

export const DeleteLibraryFolderPolicyHandler =
  () => (ability: AppAbility, libraryFolder?: Partial<LibraryFolder>) =>
    policyHandlerFactory(ability, Action.Delete, libraryFolder);

export const ReadLibraryFolderPolicyHandler =
  () => (ability: AppAbility, libraryFolder?: Partial<LibraryFolder>) =>
    policyHandlerFactory(ability, Action.Read, libraryFolder);

export const UpdateLibraryFolderPolicyHandler =
  () => (ability: AppAbility, libraryFolder?: Partial<LibraryFolder>) =>
    policyHandlerFactory(ability, Action.Update, libraryFolder);
