import { User, Prisma } from '@prisma/client';
import { Action } from '@simpler/types';
import { AppAbility } from '../casl.factory';

const subjectType = Prisma.ModelName.User;

const policyHandlerFactory = (
  ability: AppAbility,
  action: Action,
  user?: Partial<User>
) =>
  user
    ? ability.can(action, {
        __caslSubjectType__: subjectType,
        ...(user as User),
      })
    : ability.can(action, subjectType);

export const CreateUserPolicyHandler =
  () => (ability: AppAbility, user?: Partial<User>) =>
    policyHandlerFactory(ability, Action.Create, user);

export const DeleteUserPolicyHandler =
  () => (ability: AppAbility, user?: Partial<User>) =>
    policyHandlerFactory(ability, Action.Delete, user);

export const ReadUserPolicyHandler =
  () => (ability: AppAbility, user?: Partial<User>) =>
    policyHandlerFactory(ability, Action.Read, user);

export const UpdateUserPolicyHandler =
  () => (ability: AppAbility, user?: Partial<User>) =>
    policyHandlerFactory(ability, Action.Update, user);
