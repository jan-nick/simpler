import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import {
  CASL_POLICY_KEY,
  CaslPolicyHandler,
} from '../decorators/casl-policy.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { CaslFactory } from '@simpler/authorization/core';

/**
 * Guard that is used in conjunction with `CaslAbility`, `CaslAccessible` and `CaslPolicy` decorators.
 * @example
 * ```ts
 * ＠UseGuards(CaslGuard)
 * async getLibraryFiles(
 *   ＠CaslAbility() ability: AppAbility,
 *   ＠CaslAccessible('LibraryFile') accessibleLibraryFiles: Prisma.LibraryFileWhereInput
 * ) { ... }
 * ```
 * @example
 * ```ts
 * ＠UseGuards(CaslGuard)
 * ＠CaslPolicy((ability: AppAbility) => ability.can('read', 'LibraryFile'))
 * async getLibraryFiles() { ... }
 * ```
 */
@Injectable()
export class CaslGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslFactory: CaslFactory
  ) {
    super();
  }

  override async canActivate(context: ExecutionContext) {
    const allowAnonymousHandler = this.reflector.get<boolean | undefined>(
      IS_PUBLIC_KEY,
      context.getHandler()
    );
    if (allowAnonymousHandler) return true;

    const allowAnonymousClass = this.reflector.get<boolean | undefined>(
      IS_PUBLIC_KEY,
      context.getClass()
    );
    if (allowAnonymousClass) return true;

    let req: any;
    const type = context.getType();

    if (type === 'http') {
      req = context.switchToHttp().getRequest();
    } else {
      throw new UnauthorizedException(`Context ${type} not supported`);
    }

    if (!req.user) {
      await super.canActivate(context);
    }

    if (!req.ability) {
      req.ability = await this.caslFactory.createAbility(req.user);
    }

    const classPolicies =
      this.reflector.get<CaslPolicyHandler[]>(
        CASL_POLICY_KEY,
        context.getClass()
      ) || [];
    const handlerPolicies =
      this.reflector.get<CaslPolicyHandler[]>(
        CASL_POLICY_KEY,
        context.getHandler()
      ) || [];
    const policies = classPolicies.concat(handlerPolicies);
    return policies.every((handler) => handler(req.ability));
  }
}
