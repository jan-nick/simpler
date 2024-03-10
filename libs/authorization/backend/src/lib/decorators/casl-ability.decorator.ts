import {
  ContextType,
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { AppAbility } from '@simpler/authorization/core';

/**
 * Parameter decorator to provide the `CaslAbility` for the current user.
 * ```ts
 * ＠UseGuards(CaslGuard)
 * sample(＠CaslAbility() ability: AppAbility) { ... }
 * ```
 */
export const CaslAbility = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    let ability: AppAbility;
    const type = context.getType() as ContextType;

    if (type === 'http') {
      ability = context.switchToHttp().getRequest().ability;
    } else {
      throw new UnauthorizedException(`Context ${type} not supported`);
    }

    if (!ability) {
      throw new UnauthorizedException('No ability found for request');
    }

    return ability;
  }
);
